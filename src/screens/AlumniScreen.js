import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function AlumniScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const departmentOptions = [
    "School of Engineering & Technology",
    "School of Computer Application",
    "School of Leadership & Management",
    "School of Allied Health Sciences",
    "School of Behavioral and Social Sciences",
    "School of Media Studies & Humanities",
    "School of Design",
    "School of Commerce",
    "School of Culinary and Hotel Management",
  ];

  const loadDirectory = async () => {
    setLoading(true);
    setTimeout(() => {
      const response = [
        { user_id: "1", name: "John Doe", email: "john@example.com", department: "School of Computer Application", graduation_year: "2023", company: "Google" },
        { user_id: "2", name: "Jane Smith", email: "jane@example.com", department: "School of Engineering & Technology", graduation_year: "2022", company: "Microsoft" },
        { user_id: "3", name: "Amit Sharma", email: "amit@gmail.com", department: "School of Leadership & Management", graduation_year: "2021", company: "Deloitte" },
        { user_id: "4", name: "Priya Verma", email: "priya@gmail.com", department: "School of Allied Health Sciences", graduation_year: "2020", company: "Apollo Hospitals" },
        { user_id: "5", name: "Rahul Mehta", email: "rahul@gmail.com", department: "School of Behavioral and Social Sciences", graduation_year: "2019", company: "UNICEF" },
        { user_id: "6", name: "Sneha Kapoor", email: "sneha@gmail.com", department: "School of Media Studies & Humanities", graduation_year: "2022", company: "NDTV" },
        { user_id: "7", name: "Arjun Singh", email: "arjun@gmail.com", department: "School of Design", graduation_year: "2023", company: "Adobe" },
        { user_id: "8", name: "Neha Gupta", email: "neha@gmail.com", department: "School of Commerce", graduation_year: "2021", company: "KPMG" },
        { user_id: "9", name: "Rohit Jain", email: "rohit@gmail.com", department: "School of Culinary and Hotel Management", graduation_year: "2020", company: "Taj Hotels" },
        { user_id: "10", name: "Karan Malhotra", email: "karan@gmail.com", department: "School of Engineering & Technology", graduation_year: "2024", company: "Amazon" },
        { user_id: "11", name: "Ananya Das", email: "ananya@gmail.com", department: "School of Computer Application", graduation_year: "2023", company: "Infosys" },
        { user_id: "12", name: "Vikram Patel", email: "vikram@gmail.com", department: "School of Commerce", graduation_year: "2022", company: "PwC" },
        { user_id: "13", name: "Simran Kaur", email: "simran@gmail.com", department: "School of Design", graduation_year: "2021", company: "Canva" },
        { user_id: "14", name: "Aditya Roy", email: "aditya@gmail.com", department: "School of Media Studies & Humanities", graduation_year: "2020", company: "Zee News" },
        { user_id: "15", name: "Pooja Singh", email: "pooja@gmail.com", department: "School of Allied Health Sciences", graduation_year: "2023", company: "Fortis" },
        { user_id: "16", name: "Nikhil Verma", email: "nikhil@gmail.com", department: "School of Leadership & Management", graduation_year: "2022", company: "EY" },
        { user_id: "17", name: "Riya Sharma", email: "riya@gmail.com", department: "School of Behavioral and Social Sciences", graduation_year: "2021", company: "WHO" },
        { user_id: "18", name: "Harsh Gupta", email: "harsh@gmail.com", department: "School of Engineering & Technology", graduation_year: "2020", company: "TCS" },
        { user_id: "19", name: "Mehul Jain", email: "mehul@gmail.com", department: "School of Culinary and Hotel Management", graduation_year: "2023", company: "Oberoi Hotels" },
        { user_id: "20", name: "Isha Kapoor", email: "isha@gmail.com", department: "School of Commerce", graduation_year: "2024", company: "ICICI Bank" },
        { user_id: "21", name: "Rajat Bansal", email: "rajat@gmail.com", department: "School of Computer Application", graduation_year: "2022", company: "Wipro" },
        { user_id: "22", name: "Kriti Mehta", email: "kriti@gmail.com", department: "School of Design", graduation_year: "2023", company: "Figma" },
        { user_id: "23", name: "Yash Agarwal", email: "yash@gmail.com", department: "School of Engineering & Technology", graduation_year: "2021", company: "Intel" },
        { user_id: "24", name: "Tanvi Shah", email: "tanvi@gmail.com", department: "School of Media Studies & Humanities", graduation_year: "2022", company: "Times Now" },
        { user_id: "25", name: "Siddharth Mishra", email: "sid@gmail.com", department: "School of Leadership & Management", graduation_year: "2020", company: "McKinsey" },
        { user_id: "26", name: "Deepika Reddy", email: "deepika@gmail.com", department: "School of Allied Health Sciences", graduation_year: "2023", company: "AIIMS" },
        { user_id: "27", name: "Manish Yadav", email: "manish@gmail.com", department: "School of Behavioral and Social Sciences", graduation_year: "2021", company: "NGO India" },
        { user_id: "28", name: "Aakash Singh", email: "aakash@gmail.com", department: "School of Commerce", graduation_year: "2022", company: "HDFC Bank" },
        { user_id: "29", name: "Varun Khanna", email: "varun@gmail.com", department: "School of Culinary and Hotel Management", graduation_year: "2024", company: "Marriott" },
        { user_id: "30", name: "Naina Arora", email: "naina@gmail.com", department: "School of Computer Application", graduation_year: "2023", company: "Capgemini" },
        { user_id: "31", name: "Rakesh Kumar", email: "rakesh@gmail.com", department: "School of Engineering & Technology", graduation_year: "2020", company: "L&T" },
        { user_id: "32", name: "Komal Jain", email: "komal@gmail.com", department: "School of Design", graduation_year: "2022", company: "Behance" },
        { user_id: "33", name: "Abhishek Gupta", email: "abhishek@gmail.com", department: "School of Commerce", graduation_year: "2021", company: "Grant Thornton" },
        { user_id: "34", name: "Shreya Sen", email: "shreya@gmail.com", department: "School of Media Studies & Humanities", graduation_year: "2023", company: "BBC" },
        { user_id: "35", name: "Kunal Shah", email: "kunal@gmail.com", department: "School of Leadership & Management", graduation_year: "2024", company: "Accenture" },
        { user_id: "36", name: "Divya Nair", email: "divya@gmail.com", department: "School of Allied Health Sciences", graduation_year: "2022", company: "Max Healthcare" },
        { user_id: "37", name: "Pankaj Sinha", email: "pankaj@gmail.com", department: "School of Behavioral and Social Sciences", graduation_year: "2020", company: "UNDP" },
        { user_id: "38", name: "Alok Verma", email: "alok@gmail.com", department: "School of Engineering & Technology", graduation_year: "2023", company: "Samsung" },
        { user_id: "39", name: "Ritu Malhotra", email: "ritu@gmail.com", department: "School of Culinary and Hotel Management", graduation_year: "2021", company: "ITC Hotels" },
        { user_id: "40", name: "Gaurav Bhatia", email: "gaurav@gmail.com", department: "School of Computer Application", graduation_year: "2024", company: "Oracle" },
        { user_id: "41", name: "Meera Iyer", email: "meera@gmail.com", department: "School of Commerce", graduation_year: "2023", company: "Axis Bank" },
        { user_id: "42", name: "Ankit Tiwari", email: "ankit@gmail.com", department: "School of Engineering & Technology", graduation_year: "2022", company: "IBM" },
        { user_id: "43", name: "Sanya Khurana", email: "sanya@gmail.com", department: "School of Design", graduation_year: "2021", company: "Dribbble" },
        { user_id: "44", name: "Mohit Arora", email: "mohit@gmail.com", department: "School of Leadership & Management", graduation_year: "2023", company: "BCG" },
        { user_id: "45", name: "Kavya Pillai", email: "kavya@gmail.com", department: "School of Allied Health Sciences", graduation_year: "2024", company: "Manipal Hospitals" },
        { user_id: "46", name: "Rohini Das", email: "rohini@gmail.com", department: "School of Media Studies & Humanities", graduation_year: "2022", company: "India Today" },
        { user_id: "47", name: "Saurabh Jain", email: "saurabh@gmail.com", department: "School of Behavioral and Social Sciences", graduation_year: "2023", company: "NGO Global" },
        { user_id: "48", name: "Tarun Khurana", email: "tarun@gmail.com", department: "School of Culinary and Hotel Management", graduation_year: "2020", company: "Hyatt" },
        { user_id: "49", name: "Payal Gupta", email: "payal@gmail.com", department: "School of Commerce", graduation_year: "2021", company: "HSBC" },
        { user_id: "50", name: "Nitin Arora", email: "nitin@gmail.com", department: "School of Computer Application", graduation_year: "2022", company: "Zoho" },
        { user_id: "51", name: "Ravi Kumar", email: "ravi@gmail.com", department: "School of Engineering & Technology", graduation_year: "2022", company: "Infosys" },
        { user_id: "52", name: "Neha Singh", email: "neha@gmail.com", department: "School of Commerce", graduation_year: "2023", company: "HDFC Bank" },
        { user_id: "53", name: "Arjun Mehta", email: "arjun@example.com", department: "School of Design", graduation_year: "2023", company: "Adobe" },
        { user_id: "54", name: "Priyanka Das", email: "priyanka@example.com", department: "School of Media Studies & Humanities", graduation_year: "2021", company: "BBC" },
      ];

      setData(response);
      setAllData(response);
      setCount(response.length);
      setLoading(false);
      navigation.navigate("HomeScreen", { count: response.length });
    }, 1000);
  };

  useFocusEffect(
    useCallback(() => {
      loadDirectory();
    }, [])
  );

  const handleSearch = () => {
    const filtered = allData.filter((item) => {
      return (
        (search === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.department.toLowerCase().includes(search.toLowerCase()) ||
          item.graduation_year.includes(search)) &&
        (department === "" ||
          item.department.toLowerCase().includes(department.toLowerCase())) &&
        (year === "" || item.graduation_year.includes(year))
      );
    });
    setData(filtered);
  };

  const AlumniCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.meta}>{item.email}</Text>
      <Text style={styles.meta}>Department: {item.department}</Text>
      <Text style={styles.meta}>Graduation: {item.graduation_year}</Text>
      <Text style={styles.meta}>Company: {item.company}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Alumni Directory</Text>

        {/* 🔍 Main Search — full width, standalone */}
        <View style={styles.searchWrapper}>
          <Text style={styles.icon}>🔍</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Search by name / department / year"
            placeholderTextColor="#7e7c7c"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Department + Year row */}
        <View style={styles.row}>
          {/* 🏫 Department Dropdown */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={styles.icon}>🏫</Text>
              <Text style={[styles.inputField, { color: department ? "#000" : "#7e7c7c", paddingVertical: 2 }]}>
                {department || "Department"}
              </Text>
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdown}>
                <FlatList
                  data={departmentOptions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setDepartment(item);
                        setShowDropdown(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* 📅 Year Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.icon}>📅</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Year"
              placeholderTextColor="#7e7c7c"
              keyboardType="numeric"
              value={year}
              onChangeText={setYear}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#1a2a6c" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.user_id}
            renderItem={AlumniCard}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "800", color: "#1a2a6c", marginBottom: 14 },
  row: { flexDirection: "row", gap: 8, alignItems: "flex-start" },

  // Full-width wrapper for the main search bar
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
  },

  // flex:1 wrapper used inside the row for dept & year
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
    flex: 1,
  },

  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    paddingVertical: 8,
    color: "#000",
    fontSize: 14,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchButton: {
    backgroundColor: "#1a2a6c",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  searchButtonText: { color: "#fff", fontWeight: "600" },
  list: { paddingBottom: 90 },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#1a2a6c" },
  meta: { color: "#7e7c7c" },
});