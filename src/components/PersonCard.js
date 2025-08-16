import React from "react";
import { TouchableOpacity, View, Text, Image, Alert } from "react-native";
import styles from "../styles/PersonCard.styles";

export default function PersonCard({ persona, onPress, onDelete, onDeletePhoto }) {
  const handleLongPress = () => {
    Alert.alert(
      "Eliminar persona",
      `¿Deseas eliminar a ${persona.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => onDelete(persona.id) },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(persona)}
      onLongPress={handleLongPress}
      activeOpacity={0.8}
    >
      {persona.foto ? (
        <Image source={{ uri: persona.foto }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Foto</Text>
        </View>
      )}
      <Text style={styles.name}>
        {persona.nombre} {persona.apellido}
      </Text>
    </TouchableOpacity>
  );
}
