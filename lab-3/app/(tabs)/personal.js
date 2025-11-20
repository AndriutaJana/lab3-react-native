import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { initDb, addRecipe, getAllRecipes } from "../../db";

export default function PersonalRecipesScreen() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    async function setup() {
      await initDb();
      const data = await getAllRecipes();
      setRecipes(data);
    }
    setup();
  }, []);

  const reloadRecipes = async () => {
    const data = await getAllRecipes();
    setRecipes(data);
  };

  const handleAdd = async () => {
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      alert("Completează numele, ingredientele și instrucțiunile.");
      return;
    }

    await addRecipe(title, ingredients, instructions, imageUrl);

    setTitle("");
    setIngredients("");
    setInstructions("");
    setImageUrl("");

    await reloadRecipes();
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => setSelectedRecipe(item)}>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Formular  */}
      <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Adaugă o rețetă personală</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Numele rețetei"
          style={styles.input}
        />

        <TextInput
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Ingrediente (poți scrie pe linii separate)"
          style={[styles.input, styles.multiline]}
          multiline
        />

        <TextInput
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Instrucțiuni"
          style={[styles.input, styles.multiline]}
          multiline
        />

        <TextInput
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="URL imagine (opțional)"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Salvează rețeta</Text>
        </Pressable>
      </ScrollView>
      {/* list cu retete salvate*/}
      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Rețetele mele</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
      {/* cand selectezi o reteta afiseaa detaliile ei */}
      {selectedRecipe && (
        <ScrollView style={styles.details}>
          <Text style={styles.detailsTitle}>{selectedRecipe.title}</Text>
          {selectedRecipe.image ? (
            <Image
              source={{ uri: selectedRecipe.image }}
              style={styles.detailsImage}
            />
          ) : null}
          <Text style={styles.sectionTitle}>Ingrediente</Text>
          <Text style={styles.text}>{selectedRecipe.ingredients}</Text>

          <Text style={styles.sectionTitle}>Instrucțiuni</Text>
          <Text style={styles.text}>{selectedRecipe.instructions}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  form: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2e8b57",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  item: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 16,
  },
  details: {
    marginTop: 12,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailsImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
});
