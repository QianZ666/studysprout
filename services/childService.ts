import { db } from "@/firebase/firebaseConfig";
import { Child } from "@/types/Child";
import { addDoc, collection, getDocs } from "firebase/firestore";

// Create a new child profile
export const createChild = async (child: Child) => {
  const docRef = await addDoc(collection(db, "children"), child);

  return docRef.id;
};
// Get all children
export const getChildren = async () => {
  const snapshot = await getDocs(collection(db, "children"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
