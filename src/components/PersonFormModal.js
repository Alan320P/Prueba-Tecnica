import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "../styles/PersonFormModal.styles";

export default function PersonFormModal({ visible, onClose, onSave, persona }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (visible) {
      if (persona) {
        setNombre(persona.nombre || "");
        setApellido(persona.apellido || "");
        setFoto(persona.foto || null);
      } else {
        setNombre("");
        setApellido("");
        setFoto(null);
      }
    }
  }, [persona, visible]);

  const seleccionarFoto = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.7 });
    if (result.assets && result.assets.length > 0) setFoto(result.assets[0].uri);
  };

  const guardar = () => {
    if (!nombre || !apellido) return alert("Completa nombre y apellido");
    onSave({ ...persona, nombre, apellido, foto });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{persona ? "Editar Persona" : "Nueva Persona"}</Text>

          <TouchableOpacity style={styles.photoCircle} onPress={seleccionarFoto}>
            {foto ? (
              <Image source={{ uri: foto }} style={styles.photoImage} />
            ) : (
              <Text style={styles.photoText}>Agregar Foto</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Apellido"
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
          />

          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={guardar}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={[styles.buttonText, { color: "#555" }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
