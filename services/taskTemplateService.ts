import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/firebaseConfig";
import { TaskTemplate } from "@/types/TaskTemplate";

export const createTaskTemplate = async (taskTemplate: TaskTemplate) => {
  const docRef = await addDoc(collection(db, "taskTemplates"), taskTemplate);

  return docRef.id;
};

export const getTaskTemplates = async () => {
  const snapshot = await getDocs(collection(db, "taskTemplates"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
