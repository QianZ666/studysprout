import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/firebaseConfig";
import { TaskTemplate } from "@/types/TaskTemplate";

export const createTaskTemplate = async (taskTemplate: TaskTemplate) => {
  const docRef = await addDoc(collection(db, "taskTemplates"), taskTemplate);

  return docRef.id;
};

export const getTaskTemplates = async (childId: string) => {
  const q = query(
    collection(db, "taskTemplates"),
    where("childId", "==", childId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
