import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePersonStorage = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("personas");
      if (stored) setPersonas(JSON.parse(stored));
    };
    load();
  }, []);

  const save = async (newList) => {
    setPersonas(newList);
    await AsyncStorage.setItem("personas", JSON.stringify(newList));
  };

  const addPerson = async (persona) => save([...personas, persona]);

  const updatePerson = async (persona) =>
    save(personas.map(p => (p.id === persona.id ? persona : p)));

  const removePerson = async (id) =>
    save(personas.filter(p => p.id !== id));

  const removePhoto = async (id) => {
    const updatedList = personas.map(p =>
      p.id === id ? { ...p, foto: null } : p
    );
    await save(updatedList);
  };

  return { personas, addPerson, updatePerson, removePerson, removePhoto };
};
