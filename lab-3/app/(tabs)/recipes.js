import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const CATEGORY = "Seafood"; // o categorie implicita

export default function RecipesScreen() {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // încărcăm o categorie
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CATEGORY}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (e) {
      console.log("Eroare categorie:", e);
    } finally {
      setLoading(false);
    }
  };

  const searchMeals = async () => {
    if (!searchText.trim()) {
      loadCategory();
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (e) {
      console.log("Eroare căutare:", e);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/recipe-details",
            params: { id: item.idMeal, title: item.strMeal },
          })
        }
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <Text style={styles.cardTitle}>{item.strMeal}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exploră rețete online</Text>

      <View style={styles.searchRow}>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Caută rețetă după nume..."
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={searchMeals}>
          <Text style={styles.buttonText}>Caută</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    borderRadius: 6,
    height: 40,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
