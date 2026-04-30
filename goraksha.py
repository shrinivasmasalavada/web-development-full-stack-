import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const GoRakshaApp());
}

class GoRakshaApp extends StatelessWidget {
  const GoRakshaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => DoctorProvider()),
        ChangeNotifierProvider(create: (_) => SchemeProvider()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Go Raksha',
        theme: ThemeData(
          primarySwatch: Colors.green,
        ),
        home: const HomeScreen(),
      ),
    );
  }
}

//////////////////////////////////////////////////////////
// MODELS
//////////////////////////////////////////////////////////

class Doctor {
  final String id;
  final String name;
  final String location;
  final String phone;
  final String type;

  Doctor({
    required this.id,
    required this.name,
    required this.location,
    required this.phone,
    required this.type,
  });

  factory Doctor.fromFirestore(Map<String, dynamic> data, String id) {
    return Doctor(
      id: id,
      name: data['name'] ?? '',
      location: data['location'] ?? '',
      phone: data['phone'] ?? '',
      type: data['type'] ?? '',
    );
  }
}

class Scheme {
  final String id;
  final String name;
  final String description;
  final String eligibility;
  final String apply;

  Scheme({
    required this.id,
    required this.name,
    required this.description,
    required this.eligibility,
    required this.apply,
  });

  factory Scheme.fromFirestore(Map<String, dynamic> data, String id) {
    return Scheme(
      id: id,
      name: data['name'] ?? '',
      description: data['description'] ?? '',
      eligibility: data['eligibility'] ?? '',
      apply: data['apply'] ?? '',
    );
  }
}

//////////////////////////////////////////////////////////
// FIREBASE SERVICE
//////////////////////////////////////////////////////////

class FirebaseService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  Future<List<Doctor>> getDoctors() async {
    final snapshot = await _db.collection('doctors').get();
    return snapshot.docs
        .map((doc) => Doctor.fromFirestore(doc.data(), doc.id))
        .toList();
  }

  Future<List<Scheme>> getSchemes() async {
    final snapshot = await _db.collection('schemes').get();
    return snapshot.docs
        .map((doc) => Scheme.fromFirestore(doc.data(), doc.id))
        .toList();
  }
}

//////////////////////////////////////////////////////////
// PROVIDERS
//////////////////////////////////////////////////////////

class DoctorProvider extends ChangeNotifier {
  final FirebaseService _service = FirebaseService();

  List<Doctor> _doctors = [];
  bool isLoading = false;

  List<Doctor> get doctors => _doctors;

  Future<void> fetchDoctors() async {
    isLoading = true;
    notifyListeners();

    try {
      _doctors = await _service.getDoctors();
    } catch (_) {
      _doctors = [];
    }

    isLoading = false;
    notifyListeners();
  }

  List<Doctor> searchDoctors(String query) {
    return _doctors
        .where((d) =>
            d.location.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }
}

class SchemeProvider extends ChangeNotifier {
  final FirebaseService _service = FirebaseService();

  List<Scheme> _schemes = [];
  bool isLoading = false;

  List<Scheme> get schemes => _schemes;

  Future<void> fetchSchemes() async {
    isLoading = true;
    notifyListeners();

    try {
      _schemes = await _service.getSchemes();
    } catch (_) {
      _schemes = [];
    }

    isLoading = false;
    notifyListeners();
  }
}

//////////////////////////////////////////////////////////
// HOME SCREEN
//////////////////////////////////////////////////////////

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Go Raksha")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            _bigButton(
              context,
              "Doctor Locator",
              Icons.local_hospital,
              const DoctorScreen(),
            ),
            _bigButton(
              context,
              "Government Schemes",
              Icons.account_balance,
              const SchemeScreen(),
            ),
            _bigButton(
              context,
              "Emergency First Aid",
              Icons.warning,
              const FirstAidScreen(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _bigButton(
      BuildContext context, String text, IconData icon, Widget screen) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          minimumSize: const Size(double.infinity, 80),
        ),
        onPressed: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (_) => screen));
        },
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 30),
            const SizedBox(width: 15),
            Text(text, style: const TextStyle(fontSize: 20)),
          ],
        ),
      ),
    );
  }
}

//////////////////////////////////////////////////////////
// DOCTOR SCREEN
//////////////////////////////////////////////////////////

class DoctorScreen extends StatefulWidget {
  const DoctorScreen({super.key});

  @override
  State<DoctorScreen> createState() => _DoctorScreenState();
}

class _DoctorScreenState extends State<DoctorScreen> {
  String query = "";

  @override
  void initState() {
    super.initState();
    Provider.of<DoctorProvider>(context, listen: false).fetchDoctors();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<DoctorProvider>(context);

    final doctors = query.isEmpty
        ? provider.doctors
        : provider.searchDoctors(query);

    return Scaffold(
      appBar: AppBar(title: const Text("Doctor Locator")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(10),
            child: TextField(
              decoration: const InputDecoration(
                hintText: "Search by village/taluk",
                border: OutlineInputBorder(),
              ),
              onChanged: (val) => setState(() => query = val),
            ),
          ),
          if (provider.isLoading)
            const Center(child: CircularProgressIndicator())
          else if (doctors.isEmpty)
            const Center(child: Text("No doctors found"))
          else
            Expanded(
              child: ListView.builder(
                itemCount: doctors.length,
                itemBuilder: (_, i) {
                  final d = doctors[i];
                  return Card(
                    child: ListTile(
                      title: Text(d.name),
                      subtitle: Text("${d.location} • ${d.type}"),
                      trailing: IconButton(
                        icon: const Icon(Icons.call),
                        onPressed: () => _callDoctor(d.phone),
                      ),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
    );
  }

  void _callDoctor(String phone) async {
    final Uri url = Uri.parse("tel:$phone");
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    }
  }
}

//////////////////////////////////////////////////////////
// SCHEME SCREEN
//////////////////////////////////////////////////////////

class SchemeScreen extends StatefulWidget {
  const SchemeScreen({super.key});

  @override
  State<SchemeScreen> createState() => _SchemeScreenState();
}

class _SchemeScreenState extends State<SchemeScreen> {
  @override
  void initState() {
    super.initState();
    Provider.of<SchemeProvider>(context, listen: false).fetchSchemes();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<SchemeProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text("Government Schemes")),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              children: provider.schemes.map((s) {
                return ExpansionTile(
                  title: Text(s.name),
                  children: [
                    ListTile(title: Text("Description: ${s.description}")),
                    ListTile(title: Text("Eligibility: ${s.eligibility}")),
                    ListTile(title: Text("How to Apply: ${s.apply}")),
                  ],
                );
              }).toList(),
            ),
    );
  }
}

//////////////////////////////////////////////////////////
// FIRST AID SCREEN
//////////////////////////////////////////////////////////

class FirstAidScreen extends StatelessWidget {
  const FirstAidScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Emergency First Aid")),
      body: ListView(
        children: const [
          ListTile(
            title: Text("Fever"),
            subtitle: Text("1. Give clean water\n2. Keep animal cool"),
          ),
          ListTile(
            title: Text("Skin Disease"),
            subtitle: Text("1. Isolate animal\n2. Clean wounds"),
          ),
          ListTile(
            title: Text("Injury"),
            subtitle: Text("1. Stop bleeding\n2. Call doctor"),
          ),
        ],
      ),
    );
  }
}