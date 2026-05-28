import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAF8",
  },
  childSwitcher: {
    marginTop: 60,
    marginBottom: 36,
  },
  childName: {
    fontSize: 30,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },
  taskList: {
    gap: 14,
  },
  taskText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  actionButton: {
    backgroundColor: "#E8F0E8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdown: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    marginTop: -12,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownScroll: {
    maxHeight: 220,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 100,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#CFE3CF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 6,
  },

  fabText: {
    fontSize: 34,
    fontWeight: "300",
  },
  addTaskPopup: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 180,

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },

  popupInput: {
    backgroundColor: "#F3F5F3",
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  popupButton: {
    backgroundColor: "#CFE3CF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  popupButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
