import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonCard from "../components/PersonCard";
import PersonFormModal from "../components/PersonFormModal";
import PersonDetailModal from "../components/PersonDetailModal";
import { usePersonStorage } from "../hooks/usePersonStorage";
import styles from "../styles/HomeScreen.styles";

export default function HomeScreen() {
  const { personas, addPerson, updatePerson, removePerson, removePhoto } = usePersonStorage();
  const [formVisible, setFormVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const abrirNuevoFormulario = () => {
    setSelectedPerson(null); 
    setFormVisible(true);   
  };

  const abrirDetalle = (persona) => {
    setSelectedPerson(persona);
    setDetailVisible(true);
  };

  const editarPersona = () => {
    setDetailVisible(false);
    setFormVisible(true);
  };

  const guardarPersona = async (persona) => {
    if (persona.id) {
      await updatePerson(persona);
    } else {
      await addPerson({ ...persona, id: Date.now().toString() });
    }
    setFormVisible(false);
    setSelectedPerson(null);
  };

  const handleDeletePhoto = (id) => {
    removePhoto(id);
    setSelectedPerson((prev) => ({ ...prev, foto: null }));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {personas.length === 0 && (
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={styles.addButtonEmpty}
            onPress={abrirNuevoFormulario}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.addButtonLabel}>Agregar Tarjeta Personal</Text>
        </View>
      )}

      <FlatList
        data={personas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PersonCard
            persona={item}
            onPress={abrirDetalle}
            onDelete={(id) => removePerson(id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {personas.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={abrirNuevoFormulario}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      <PersonFormModal
        visible={formVisible}
        onClose={() => { setFormVisible(false); setSelectedPerson(null); }}
        onSave={guardarPersona}
        persona={selectedPerson}
      />

      <PersonDetailModal
        visible={detailVisible}
        persona={selectedPerson}
        onClose={() => setDetailVisible(false)}
        onEdit={editarPersona}
        onDeletePhoto={handleDeletePhoto}
      />
    </SafeAreaView>
  );
}
