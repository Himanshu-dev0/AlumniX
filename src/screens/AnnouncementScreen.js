import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";

import firestore from "@react-native-firebase/firestore";

export default function AnnouncementScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [announcements, setAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null);

  //  Fetch data (real-time)
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("announcements")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        snapshot => {
          const list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAnnouncements(list);
        },
        error => {
          Alert.alert("Error", error.message);
        }
      );

    return unsubscribe;
  }, []);

  //  Create or Update
  const handleSave = async () => {
    if (!title || !description || !date) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await firestore()
          .collection("announcements")
          .doc(editId)
          .update({
            title,
            description,
            date
          });

        setEditId(null);
      } else {
        // CREATE
        await firestore()
          .collection("announcements")
          .add({
            title,
            description,
            date,
            createdAt: firestore.FieldValue.serverTimestamp()
          });
      }

      setTitle("");
      setDescription("");
      setDate("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //  Delete with confirmation
  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this announcement?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore()
                .collection("announcements")
                .doc(id)
                .delete();
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          }
        }
      ]
    );
  };

  //  Edit
  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date);
    setEditId(item.id);
  };

  //  Render item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.desc}>{item.description}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => handleEdit(item)}
        >
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={{ color: "#f8f6f6" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcements</Text>

      {/* Form */}
      <View style={styles.card}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#7e7c7c"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="#7e7c7c"
          style={[styles.input, { height: 80 }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          placeholderTextColor="#7e7c7c"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity style={styles.createBtn} onPress={handleSave}>
          <Text style={styles.createText}>
            {editId ? "Update" : "Create"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {announcements.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No announcements yet
        </Text>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f7",
    paddingTop: 55    
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a2a6c",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },

  createBtn: {
    backgroundColor: "#1a2a6c",
    padding: 15,
    borderRadius: 30,
    alignItems: "center"
  },

  createText: {
    color: "#fcfbfb",
    fontWeight: "600"
  },

  title: {
    fontSize: 18,
    
    fontWeight: "bold",
  },

  date: {
    color: "#0a0202",
    marginVertical: 5
  },

  desc: {
    color: "#444"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  editBtn: {
    borderWidth: 1,
    borderColor: "#1a2a6c",
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center"
  },

  deleteBtn: {
    backgroundColor: "#1a2a6c",
    padding: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center"
  }
});