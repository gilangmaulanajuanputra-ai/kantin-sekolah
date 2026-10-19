const menu = [
    { id: 1, nama: "Nasi Goreng", harga: 15000 },
    { id: 2, nama: "Mie Goreng", harga: 12000 },
    { id: 3, nama: "Ayam Geprek", harga: 18000 },
    { id: 4, nama: "Es Teh", harga: 5000 },
    { id: 5, nama: "Air Mineral", harga: 4000 }
];

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function hitungTotal() {
    let subtotal = 0;
    let daftarBeli = [];

    
    menu.forEach(item => {
        let qty = parseInt(document.getElementById(`qty-${item.id}`).value) || 0;
        if (qty > 0) {
            let totalItem = item.harga * qty;
            subtotal += totalItem;
            daftarBeli.push({ nama: item.nama, qty: qty, total: totalItem });
        }
    });

   
    if (subtotal === 0) {
        alert("Silakan pilih minimal 1 menu terlebih dahulu!");
        return;
    }

    
    let totalBayar = subtotal;

    let namaPelanggan = document.getElementById("namaPelanggan").value || "Pelanggan";
    let uangBayar = parseInt(document.getElementById("uangBayar").value) || 0;

    
    document.getElementById("hasil").style.display = "block";
    document.getElementById("resSubtotal").innerText = formatRupiah(subtotal);
    

    let elDiskon = document.getElementById("resDiskon");
    if (elDiskon) elDiskon.innerText = "Rp0";

    document.getElementById("resTotal").innerText = formatRupiah(totalBayar);
    document.getElementById("resUang").innerText = formatRupiah(uangBayar);

    let pesanError = document.getElementById("pesanError");
    let strukBox = document.getElementById("strukBox");
    pesanError.innerText = "";
    strukBox.style.display = "none";


    if (uangBayar < totalBayar) {
        let kurang = totalBayar - uangBayar;
        document.getElementById("resKembali").innerText = "Rp0";
        pesanError.innerText = ` Transaksi Gagal: Uang tidak cukup! (Kurang ${formatRupiah(kurang)})`;
        alert(`Uang tidak cukup! Pembayaran kurang ${formatRupiah(kurang)}`);
    } else {
        let kembalian = uangBayar - totalBayar;
        document.getElementById("resKembali").innerText = formatRupiah(kembalian);

    
        strukBox.style.display = "block";
        let struk = "==============================\n";
        struk += "        KANTIN SEKOLAH        \n";
        struk += "==============================\n";
        struk += `Nama : ${namaPelanggan}\n\n`;

        daftarBeli.forEach(b => {
            struk += `${b.nama.padEnd(15)} x${b.qty}\n`;
        });

        struk += `\nSubtotal : ${formatRupiah(subtotal)}\n`;
        struk += `Total    : ${formatRupiah(totalBayar)}\n`;
        struk += `Bayar    : ${formatRupiah(uangBayar)}\n`;
        struk += `Kembali  : ${formatRupiah(kembalian)}\n`;
        struk += "==============================\n";
        struk += "         TERIMA KASIH         \n";
        struk += "==============================";

        document.getElementById("strukText").innerText = struk;
    }
}