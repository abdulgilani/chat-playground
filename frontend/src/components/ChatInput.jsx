import { Image, Send, X } from "lucide-react";
import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { encryptMessage } from "../utils/encryption";

import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let encryptedText, encryptedImage;

    if (!text.trim() && !image) return;

    // Encrypt the message
    if (text) {
      try {
        encryptedText = encryptMessage(text);
      } catch (error) {
        console.error("Failed to encrypt the text message: ", error);
        encryptedText = "[Encryption Error]";
      }
    }

    // Encrypt the image file
    if (image) {
      try {
        encryptedImage = encryptMessage(image);
      } catch (error) {
        console.error("Failed to encrypt the image: ", error);
        encryptedImage = null;
      }
    }

    try {
      await sendMessage({
        text: encryptedText,
        image: encryptedImage,
      });

      setText("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send the message: ", error);
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile.type.startsWith("/image")) {
      toast.error("You must select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="Image Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${image ? "text-emerald-500" : "text-zinc-500"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !image}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
