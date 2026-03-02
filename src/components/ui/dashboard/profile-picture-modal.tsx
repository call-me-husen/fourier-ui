import { Loader2, UploadCloud, X, Camera } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Modal } from "../common/modal";
import Image from "next/image";
import { useUpdateProfilePicture } from "@/hooks/employee/use-employee-api";
import useSnackbar from "@/hooks/core/use-snackbar";
import { useUser } from "@/hooks/user/use-user";

type UploadFileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl?: string | null;
  onSuccess: (newPhotoUrl: string) => void;
};


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

export default function UploadFileModal({
  isOpen,
  onClose,
  currentPhotoUrl,
  onSuccess,
}: UploadFileModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { show } = useSnackbar();
  const { setUser } = useUser()
  const { fetcher: postUpdateProfilePicture } = useUpdateProfilePicture({
    onSuccess: ({photoUrl}) => {
      show("Profile picture updated successfully", { type: "success" });
      setUser(prev => {
        if (!prev) return prev;
        return { ...prev, photoUrl };
      })
    },
    onError: (error) => {
      show(error, { type: "error" });
    },
  })

  const handleClose = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setIsLoading(false);
    onClose();
  }, [onClose]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload JPG, PNG, or GIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }

    setError(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      await postUpdateProfilePicture({ file: selectedFile });
      handleClose();
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Profile Picture"
      size="md"
      footer={
        <>
          <button
            className="px-5 py-2.5 rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 text-muted-foreground transition-all disabled:opacity-50"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all flex items-center gap-2 font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                Upload
              </>
            )}
          </button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        Upload a new profile picture to personalize your account. Supported
        formats are JPG, PNG, and GIF. Max file size is 5MB.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="mt-6">
        {previewUrl ? (
          <div className="relative">
            <div className="h-48 w-48 mx-auto rounded-2xl overflow-hidden bg-muted">
              <Image
                src={previewUrl}
                alt="Preview"
                width={192}
                height={192}
                className="h-48 w-48 object-cover"
              />
            </div>
            <button
              onClick={handleRemovePreview}
              className="absolute cursor-pointer -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button
              onClick={handleChooseFile}
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all flex items-center gap-2 font-medium shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              Choose File
            </button>
          </div>
        )}
      </div>

      {!previewUrl && currentPhotoUrl && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">Current photo:</p>
          <div className="mt-2 h-16 w-16 mx-auto rounded-xl overflow-hidden bg-muted">
            <Image
              src={currentPhotoUrl}
              alt="Current"
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
