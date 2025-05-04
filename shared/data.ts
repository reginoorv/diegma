// Data statis untuk website DIEGMA
// File ini berisi semua data yang dibutuhkan website sebagai pengganti database

// Project Categories
export const projectCategories = [
  {
    id: 1,
    name: 'Residential',
    slug: 'residential',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Commercial',
    slug: 'commercial',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Furniture',
    slug: 'furniture',
    createdAt: new Date().toISOString()
  }
];

// Projects
export const projects = [
  {
    id: 1,
    title: 'Residence Modern Jakarta',
    slug: 'residence-modern-jakarta',
    description: 'Proyek hunian modern di Jakarta dengan konsep open space yang memadukan elemen alam dan desain kontemporer. Menggunakan material berkualitas tinggi dan pencahayaan alami yang maksimal untuk menciptakan ruang yang nyaman dan elegan. Desain yang ramah lingkungan dengan penerapan teknologi hemat energi serta penggunaan material lokal yang berkelanjutan menjadi keunggulan proyek ini.',
    shortDescription: 'Hunian modern dengan sentuhan alam di jantung kota Jakarta',
    categoryId: 1,
    category: 'Residential',
    location: 'Jakarta Selatan',
    imageUrl: '/images/projects/residence-modern-jakarta.jpg',
    galleryImages: ['/images/projects/residence-modern-jakarta-1.jpg', '/images/projects/residence-modern-jakarta-2.jpg'],
    isFeatured: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Office Space Minimalist',
    slug: 'office-space-minimalist',
    description: 'Desain kantor minimalis yang mengutamakan produktivitas dan kesejahteraan karyawan. Layout yang efisien dengan area kolaborasi dan ruang privat yang seimbang, dilengkapi dengan furniture ergonomis dan pencahayaan yang optimal. Ruang kerja yang mendukung kolaborasi dan kreativitas dengan fokus pada kesejahteraan karyawan melalui desain yang mengutamakan pencahayaan alami, sirkulasi udara yang baik, dan area relaksasi.',
    shortDescription: 'Ruang kerja modern yang meningkatkan produktivitas dan kenyamanan',
    categoryId: 2,
    category: 'Commercial',
    location: 'Jakarta Pusat',
    imageUrl: '/images/projects/office-space-minimalist.jpg',
    galleryImages: ['/images/projects/office-space-minimalist-1.jpg', '/images/projects/office-space-minimalist-2.jpg'],
    isFeatured: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Custom Furniture Collection',
    slug: 'custom-furniture-collection',
    description: 'Koleksi furnitur custom yang dirancang khusus untuk melengkapi interior hunian mewah. Setiap piece dibuat dengan keahlian tinggi dan material premium, menciptakan harmoni antara fungsi dan estetika. Kreasi furniture yang menggabungkan craftsmanship tradisional dengan desain kontemporer, menggunakan material pilihan seperti kayu jati solid, kuningan, dan marmer untuk menciptakan karya seni fungsional yang tahan lama.',
    shortDescription: 'Furnitur eksklusif yang dirancang khusus untuk kebutuhan unik Anda',
    categoryId: 3,
    category: 'Furniture',
    location: 'Bandung',
    imageUrl: '/images/projects/custom-furniture-collection.jpg',
    galleryImages: ['/images/projects/custom-furniture-collection-1.jpg', '/images/projects/custom-furniture-collection-2.jpg'],
    isFeatured: 1,
    createdAt: new Date().toISOString()
  }
];

// Services
export const services = [
  {
    id: 1,
    title: 'Desain Interior dan Eksterior',
    slug: 'desain-interior-eksterior',
    description: 'Layanan desain interior dan eksterior kami mencakup konsultasi menyeluruh, perencanaan ruang, dan implementasi desain yang memadukan estetika dan fungsionalitas. Tim desainer berpengalaman kami akan bekerja sama dengan Anda untuk menciptakan ruang yang mencerminkan gaya dan kebutuhan unik Anda. Kami menawarkan berbagai gaya desain dari minimalis modern hingga klasik tradisional, selalu dengan pendekatan yang memprioritaskan kebutuhan dan gaya hidup klien.',
    shortDescription: 'Transformasi ruang Anda menjadi karya seni yang fungsional dan nyaman ditinggali',
    icon: 'fas fa-drafting-compass',
    image_url: '/images/services/desain-interior-eksterior.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Konstruksi',
    slug: 'konstruksi',
    description: 'Layanan konstruksi kami menawarkan solusi end-to-end untuk proyek pembangunan dan renovasi. Dengan tim ahli bangunan dan pengalaman bertahun-tahun, kami menangani semua aspek konstruksi dari awal hingga akhir, memastikan proyek selesai tepat waktu dan sesuai anggaran. Penggunaan teknologi Building Information Modeling (BIM) memungkinkan kami melakukan perencanaan dan koordinasi yang presisi, mengurangi kesalahan dan efisiensi biaya selama proses konstruksi.',
    shortDescription: 'Wujudkan desain impian Anda dengan layanan konstruksi berkualitas tinggi',
    icon: 'fas fa-hammer',
    image_url: '/images/services/konstruksi.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Furniture',
    slug: 'furniture',
    description: 'Koleksi furnitur kami mencakup berbagai gaya, dari klasik hingga kontemporer, dengan fokus pada kualitas dan desain yang timeless. Setiap produk dipilih dengan cermat untuk memastikan kenyamanan, daya tahan, dan nilai estetika yang tinggi bagi ruang Anda. Kami juga menawarkan layanan desain furnitur kustom untuk kebutuhan spesifik, dengan pilihan material berkualitas tinggi dan pengerjaan oleh tukang kayu terampil yang memiliki pengalaman puluhan tahun dalam industri.',
    shortDescription: 'Lengkapi ruang Anda dengan furnitur berkualitas tinggi dan desain eksklusif',
    icon: 'fas fa-couch',
    image_url: '/images/services/furniture.jpg',
    created_at: new Date().toISOString()
  }
];

// Statistics
export const stats = {
  completedProjects: 250,
  turnkeyProjects: 57,
  yearsExperience: 15,
  residentialDesigns: 180,
};

// Contacts - ini hanya contoh, tidak benar-benar digunakan karena form contact akan mengirim ke endpoint
export const contacts = [];

// Fungsi helper untuk mencari data
export function getProjectBySlug(slug: string) {
  return projects.find(project => project.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return services.find(service => service.slug === slug);
}

export function getProjectsByCategory(categorySlug: string) {
  if (categorySlug === 'all') {
    return projects;
  }
  return projects.filter(project => {
    const category = projectCategories.find(cat => cat.id === project.categoryId);
    return category?.slug === categorySlug;
  });
}

export function getFeaturedProjects() {
  return projects.filter(project => project.isFeatured === 1);
}