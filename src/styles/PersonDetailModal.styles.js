import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  editButton: {
    backgroundColor: "#6a82fb",
  },
  deleteButton: {      
    backgroundColor: "#ff4d4d",
  },
  closeButton: {
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  closeButtonText: {
    color: "#555",
  },
});
