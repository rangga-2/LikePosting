// Mengimpor React dan 'useState' untuk membuat state (penyimpan data sementara)
import React, { useState } from 'react';

// Mengimpor komponen-komponen dasar dari React Native untuk membangun tampilan (UI)
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LikePostingApp() {
  
  // -- AREA STATE (PENYIMPANAN DATA) --
  
  // State 'isLiked' untuk menyimpan status apakah postingan disukai
  const [isLiked, setIsLiked] = useState(false);
  
  // State 'isSyncing' untuk memunculkan atau menyembunyikan ikon loading
  const [isSyncing, setIsSyncing] = useState(false);
  
  // State 'likeCount' untuk menyimpan angka jumlah suka
  const [likeCount, setLikeCount] = useState(128); 

  // -- AREA FUNGSI ASYNCHRONOUS --

  // Fungsi pura-pura mengirim data ke server. (Diberi label 'async')
  const sendLikeToServer = async (currentLikeStatus) => {
    return new Promise((resolve) => {
      // setTimeout digunakan untuk menunda eksekusi kode (simulasi jaringan 1.5 detik)
      setTimeout(() => {
        resolve("Data tersinkronisasi dengan server");
      }, 1500); 
    });
  };

  // Fungsi utama yang akan dijalankan ketika pengguna menekan tombol "Suka"
  const handleLikePress = async () => {
    
    // TAHAP 1: OPTIMISTIC UPDATE (Ubah UI seketika)
    const previousState = isLiked;
    
    // Langsung ubah warna tombol dan angkanya
    setIsLiked(!previousState);
    setLikeCount(previousState ? likeCount - 1 : likeCount + 1);
    
    // Munculkan ikon loading (spinner kecil)
    setIsSyncing(true);

    // TAHAP 2: REQUEST ASYNC (Kirim ke server di background)
    try {
      // 'await' menahan baris ini sampai fungsi selesai, tanpa membuat aplikasi freeze
      await sendLikeToServer(!previousState);
      console.log("Berhasil: Status tersimpan di server.");
    } catch (error) {
      console.error(error.message);
    } finally {
      // TAHAP 3: SELESAI (Sembunyikan ikon loading)
      setIsSyncing(false);
    }
  };

  // -- AREA TAMPILAN (RENDER UI) --
  return (
    <View style={styles.container}>
      
      {/* Kontainer berbentuk kartu (card) putih di tengah layar */}
      <View style={styles.card}>
        
        {/* -- Bagian Header Profil -- */}
        <View style={styles.header}>
          {/* Lingkaran foto profil berwarna merah */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MD</Text>
          </View>
          {/* Nama pengguna dan keterangan waktu */}
          <View>
            <Text style={styles.username}>My Dimsum</Text>
            <Text style={styles.timeLocation}>Baru saja • Malang, Jawa Timur</Text>
          </View>
        </View>

        {/* -- Bagian Gambar Postingan -- */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop' }} 
          style={styles.postImage}
        />

        {/* -- Bagian Teks Judul dan Deskripsi -- */}
        <View style={styles.content}>
          <Text style={styles.postTitle}>Dimsum Enak di Malang! 🥟</Text>
          <Text style={styles.postDescription}>
            Cobain varian resep baru dari kami. Dibuat dengan bahan premium, dijamin bikin nagih! Yuk mampir.
          </Text>
        </View>

        {/* -- Garis Tipis Pemisah -- */}
        <View style={styles.divider} />

        {/* -- Bagian Bawah: Tombol Suka dan Jumlah Suka -- */}
        <View style={styles.actionRow}>
          
          {/* Tombol yang bisa ditekan untuk menjalankan handleLikePress */}
          <TouchableOpacity 
            style={[styles.likeButton, isLiked ? styles.buttonLiked : styles.buttonUnliked]} 
            onPress={handleLikePress}
            activeOpacity={0.7}
          >
            {/* Teks di dalam tombol berubah tergantung state isLiked */}
            <Text style={[styles.buttonText, isLiked && styles.textLiked]}>
              {isLiked ? '❤️ Disukai' : '🤍 Suka'}
            </Text>
          </TouchableOpacity>
          
          {/* Pembungkus untuk angka like dan indikator loading */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>{likeCount} Suka</Text>
            
            {/* Jika 'isSyncing' true, barulah tampilkan animasi loading merah */}
            {isSyncing && <ActivityIndicator size="small" color="#8B0000" style={styles.loader} />}
          </View>
          
        </View>

      </View>
    </View>
  );
}

// -- AREA STYLING (CSS) --
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#EAEAEA', 
  },
  card: {
    width: '92%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    overflow: 'hidden', 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22, 
    backgroundColor: '#8B0000', // Warna merah gelap (Deep Red)
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, 
  },
  avatarText: {
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16, 
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeLocation: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  postImage: {
    width: '100%', 
    height: 220, 
    backgroundColor: '#ddd', 
  },
  content: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20, 
  },
  divider: {
    height: 1, 
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16, 
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1.5,
  },
  buttonUnliked: {
    backgroundColor: '#FFF', 
    borderColor: '#DDD', 
  },
  buttonLiked: {
    backgroundColor: '#FFF4F4', 
    borderColor: '#8B0000', 
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666',
  },
  textLiked: {
    color: '#8B0000', 
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
  },
  loader: {
    marginLeft: 8, 
  }
});
