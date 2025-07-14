import { dataKopkar } from "./About.constant";

const About = () => {
  return (
    // Container Utama
    <main className='bg-gray-50 font-sans'>
      <div className='max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-800'>
        {/* 1. Hero Section */}
        <section className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-blue-900'>
            Tentang Kami: {dataKopkar.nama}
          </h1>
          <p className='mt-4 text-lg text-gray-600'>
            Dari Karyawan, Oleh Karyawan, Untuk Kesejahteraan Karyawan{" "}
            {dataKopkar.perusahaan}.
          </p>
        </section>

        {/* 2. Profile Section */}
        <section className='mb-12 p-8 bg-white rounded-xl shadow-md'>
          <h2 className='text-3xl font-bold text-blue-800 border-b-4 border-yellow-400 pb-3 mb-6'>
            Profil Singkat
          </h2>
          <p className='text-base leading-relaxed'>
            <strong>{dataKopkar.nama}</strong> adalah koperasi karyawan yang
            didirikan pada tahun <strong>{dataKopkar.tahunBerdiri}</strong>{" "}
            dengan semangat kebersamaan untuk meningkatkan taraf hidup dan
            kesejahteraan para anggotanya, yang merupakan karyawan dari{" "}
            <strong>{dataKopkar.perusahaan}</strong>. Kami berkomitmen untuk
            menyediakan berbagai layanan, mulai dari simpan pinjam hingga unit
            usaha lainnya yang bermanfaat bagi seluruh anggota.
          </p>
        </section>

        {/* 3. Visi & Misi Section */}
        <section className='mb-12 grid md:grid-cols-2 gap-8'>
          <div className='p-8 bg-white rounded-xl shadow-md'>
            <h3 className='text-2xl font-bold text-blue-800 mb-4'>Visi 🎯</h3>
            <p className='italic text-gray-700'>{`"${dataKopkar.visi}"`}</p>
          </div>
          <div className='p-8 bg-white rounded-xl shadow-md'>
            <h3 className='text-2xl font-bold text-blue-800 mb-4'>Misi 🚀</h3>
            <ul className='list-disc list-inside space-y-2 text-gray-700'>
              {dataKopkar.misi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Nilai-Nilai Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-blue-800 text-center border-b-4 border-yellow-400 pb-3 mb-8'>
            Nilai-Nilai Kami
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {dataKopkar.nilai.map((item, index) => (
              <div
                key={index}
                className='p-6 bg-white rounded-xl shadow-md text-center transition duration-300 hover:shadow-xl hover:-translate-y-1'
              >
                <h4 className='text-xl font-semibold text-blue-900 mb-2'>
                  {item.nama}
                </h4>
                <p className='text-sm text-gray-600'>{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Pengurus Section */}
        <section className='mb-12 p-8 bg-white rounded-xl shadow-md'>
          <h2 className='text-3xl font-bold text-blue-800 border-b-4 border-yellow-400 pb-3 mb-6'>
            Struktur Pengurus
          </h2>
          <p className='text-base leading-relaxed mb-6'>
            Kopkar kami dijalankan oleh tim yang berdedikasi dan dipilih secara
            demokratis oleh para anggota.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            {dataKopkar.pengurus.map((item, index) => (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-lg text-center flex-grow sm:flex-grow-0 min-w-[180px]'
              >
                <h5 className='font-bold text-gray-700'>{item.jabatan}</h5>
                <p className='text-blue-700 font-semibold'>{item.nama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Ajakan Bergabung Section */}
        <section className='text-center p-10 bg-blue-800 text-white rounded-xl shadow-lg'>
          <h2 className='text-3xl font-bold mb-4'>
            Bergabunglah Bersama Kami!
          </h2>
          <p className='max-w-2xl mx-auto mb-6'>
            Jadilah bagian dari keluarga besar {dataKopkar.nama} dan nikmati
            berbagai manfaat keanggotaan. Bersama kita wujudkan kesejahteraan!
          </p>
          <button className='bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full transition transform hover:bg-yellow-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-200'>
            Lihat Cara Bergabung
          </button>
        </section>
      </div>
    </main>
  );
};

export default About;
