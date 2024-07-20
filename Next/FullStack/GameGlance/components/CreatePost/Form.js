import React, { useEffect, useState } from "react";
import Data from "../../shared/Data";
import { useSession } from "next-auth/react";
import app from "./../../shared/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast from "../Toast";

function Form() {
  const [inputs, setInputs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    if (session) {
      setInputs({
        userName: session.user?.name,
        userImage: session.user?.image,
        email: session.user?.email,
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (file) {
        const storageRef = ref(storage, 'all-projects/' + file.name);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setInputs((values) => ({
          ...values,
          image: url,
        }));
        await savePost({ ...inputs, image: url });
      } else {
        await savePost(inputs);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setIsSubmitting(false);
    }
  };

  const savePost = async (postData) => {
    try {
      const docRef = doc(db, "posts", Date.now().toString());
      await setDoc(docRef, postData);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
      setInputs({});
      setFile(null);
    } catch (error) {
      console.error('Error in savePost:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      {showToast && (
        <div className="absolute top-10 right-10">
          <Toast
            msg={"Post Created Successfully"}
            closeToast={() => setShowToast(false)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          value={inputs.title || ""}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <textarea
          name="desc"
          className="w-full mb-4 outline-blue-400 border-[1px] p-2 rounded-md"
          required
          onChange={handleChange}
          placeholder="Write Description here"
          value={inputs.desc || ""}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          required
          onChange={handleChange}
          value={inputs.location || ""}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          required
          onChange={handleChange}
          value={inputs.zip || ""}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        />
        <select
          name="game"
          onChange={handleChange}
          required
          value={inputs.game || ""}
          className="w-full mb-4 border-[1px] p-2 rounded-md"
        >
          <option value="" disabled>
            Select Game
          </option>
          {Data.GameList.map((item) => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/gif, image/jpeg, image/png"
          className="mb-5 border-[1px] w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full p-1 rounded-md text-white"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
