import React, { useState, useRef } from "react";
import { useMessages } from "@/contexts/MessageContext";
import { Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    sendMessage,
    sendMessageWithAttachment,
    sendGroupMessage,
    selectedUser,
    selectedRoom,
    sendGroupMessageWithAttachment,
    isGroupChat,
  } = useMessages();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    if (isGroupChat && selectedRoom) {
      if (selectedFile) {
        await sendGroupMessageWithAttachment(
          selectedRoom.id,
          message,
          selectedFile
        );
        clearFileSelection();
      } else {
        await sendGroupMessage(selectedRoom.id, message);
      }
    } else if (selectedUser) {
      if (selectedFile) {
        await sendMessageWithAttachment(selectedUser.id, message, selectedFile);
        clearFileSelection();
      } else {
        await sendMessage(selectedUser.id, message);
      }
    }
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Le fichier doit être inférieur à 10 Mo.");
        return;
      }

      const allowedTypes = [
        "image/",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
        "application/zip",
        "application/x-zip-compressed",
      ];

      const isAllowedType = allowedTypes.some((type) =>
        file.type.startsWith(type)
      );

      if (!isAllowedType) {
        alert(
          "Type de fichier non supporté. Types acceptés : Images, PDF, DOC, DOCX, XLS, XLSX, TXT, ZIP."
        );
        return;
      }

      setSelectedFile(file);
    }
  };

  const getFilePreview = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Aperçu"
          className="h-12 w-12 object-cover rounded-lg"
        />
      );
    }

    return (
      <div className="bg-gray-100 p-2 rounded-lg text-sm">
        <span>{selectedFile.name}</span>
        <span className="block text-xs text-gray-500">
          {(selectedFile.size / 1024 / 1024).toFixed(2)} Mo
        </span>
      </div>
    );
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border-t bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-4">
        <div className="flex-1 space-y-2">
          {selectedFile && (
            <div className="flex items-center justify-between bg-gray-200 p-2 rounded-lg">
              {getFilePreview()}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFileSelection}
                className="text-red-500 hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:bg-blue-100 text-blue-500"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Joindre un fichier (Images, PDF, DOC, DOCX, XLS, XLSX, TXT, ZIP)
              </TooltipContent>
            </Tooltip>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,image/*"
            />

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre message..."
              className="flex-1 min-h-[50px] max-h-[150px] resize-none rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              rows={2}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() && !selectedFile}
          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center p-3 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-10 w-10"
          >
            <path
              fill="currentColor"
              d="M24 4C12.95 4 4 12.95 4 24c0 4.8 1.75 9.2 4.66 12.67L6.5 41.5c-.4 1.2 1 2.3 2.1 1.7l5.9-3.2C17.55 41.3 20.7 42 24 42c11.05 0 20-8.95 20-20S35.05 4 24 4z"
            />
            <path
              fill="white"
              d="M15.35 26.85l6.5-7c.4-.4 1-.4 1.4 0l4.2 4.6 5.15-7.3c.3-.5 1-.5 1.5 0l6.15 7.15c.5.6-.2 1.6-.9 1.2l-6.55-3.85-4.85 6.9c-.3.4-1 .4-1.4 0l-4.15-4.5-5.85 5.5c-.4.4-1.1 0-.9-.7z"
            />
          </svg>
        </Button>
      </form>
    </div>
  );
};
