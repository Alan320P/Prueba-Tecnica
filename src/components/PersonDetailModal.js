import React from "react";
import { Modal, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/PersonDetailModal.styles";

export default function PersonDetailModal({ visible, persona, onClose, onEdit, onDeletePhoto }) {
  if (!persona) return null;

  const handleDeletePhoto = () => {
    Alert.alert(
      "Eliminar foto",
      `¿Deseas eliminar la foto de ${persona.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            onDeletePhoto(persona.id); 
            onClose(); 
          } 
        },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {persona.foto && <Image source={{ uri: persona.foto }} style={styles.image} />}
          <Text style={styles.title}>{persona.nombre} {persona.apellido}</Text>

          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          {persona.foto && (
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeletePhoto}>
              <Text style={styles.buttonText}>Eliminar Foto</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
