"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, User, Award, FileIcon, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export function ContentAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file || !name || !marks) {
      setError("Please fill in all fields and select a file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    try {
      // 1. Upload file to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from("marksheets")
        .upload(fileName, file);

      if (storageError) throw storageError;

      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("marksheets")
        .getPublicUrl(fileName);

      const fileUrl = publicUrlData.publicUrl;

      // 3. Insert into database
      const { error: dbError } = await supabase
        .from("marksheets")
        .insert([
          {
            name,
            marks: parseFloat(marks),
            file_url: fileUrl,
          },
        ]);

      if (dbError) throw dbError;

      // Reset form and show success
      setIsUploaded(true);
      setFile(null);
      setName("");
      setMarks("");
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsUploaded(false), 3000);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  return (
    <section className="py-24 px-6 relative bg-[#0a0a0a]" id="upload-section">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#121212] to-[#080808] border border-white/5 shadow-2xl"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00dbe9]/10 blur-[80px] -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ffade5]/10 blur-[80px] -ml-16 -mb-16" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-2">
              Submit Marksheet
            </h2>
            <p className="text-neutral-500 mb-8 font-body">
              Upload your academic records to the database.
            </p>

            <AnimatePresence mode="wait">
              {isUploaded ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-[#00dbe9]/20 flex items-center justify-center rounded-full mb-4">
                    <CheckCircle2 className="text-[#00dbe9]" size={48} />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-white mb-2">
                    Uploaded Successfully!
                  </h3>
                  <p className="text-neutral-400">
                    Your marksheet has been securely saved to the database.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-600">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00dbe9] focus:ring-1 focus:ring-[#00dbe9] transition-all font-body placeholder:text-neutral-600"
                      />
                    </div>

                    {/* Marks Input */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-600">
                        <Award size={18} />
                      </div>
                      <input
                        type="number"
                        placeholder="Marks / Percentage"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-[#00dbe9] focus:ring-1 focus:ring-[#00dbe9] transition-all font-body placeholder:text-neutral-600"
                      />
                    </div>

                    {/* File Upload */}
                    <div className="relative pt-2">
                      <label className="block text-xs font-label uppercase tracking-widest text-neutral-500 mb-2 ml-1">
                        Marksheet PDF
                      </label>
                      <div 
                        className={`relative group cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3
                          ${file ? 'border-[#ffade5]/50 bg-[#ffade5]/5' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}
                        `}
                      >
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {file ? (
                          <>
                            <FileIcon className="text-[#ffade5]" size={36} />
                            <div className="text-center">
                              <p className="text-white font-medium text-sm truncate max-w-[200px]">
                                {file.name}
                              </p>
                              <p className="text-neutral-500 text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="text-neutral-600 group-hover:text-[#00dbe9] transition-colors" size={36} />
                            <div className="text-center">
                              <p className="text-white font-medium text-sm">
                                Click or drag PDF to upload
                              </p>
                              <p className="text-neutral-500 text-xs mt-1">
                                Max size: 10MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 text-red-400 text-sm mt-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Upload Button */}
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || isUploaded}
                    className={`w-full relative overflow-hidden group py-4 rounded-xl font-headline font-black text-sm uppercase tracking-widest transition-all
                      ${isUploading 
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                        : 'bg-[#00dbe9] text-[#002022] hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,219,233,0.3)]'
                      }
                    `}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isUploading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Marksheet"
                      )}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info panel */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#00dbe9]/10 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-[#00dbe9]" />
             </div>
             <div>
                <p className="text-[10px] text-neutral-500 uppercase font-label">Status</p>
                <p className="text-xs text-white font-medium">Supabase Ready</p>
             </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#ffade5]/10 flex items-center justify-center">
                <FileIcon size={16} className="text-[#ffade5]" />
             </div>
             <div>
                <p className="text-[10px] text-neutral-500 uppercase font-label">Format</p>
                <p className="text-xs text-white font-medium">PDF Only</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
