<template>
    <div class="container px-4 py-2 mt-4">
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-3 p-2 mx-4" v-for="(food, index) in foods" :key="index">
                        <div class="card mb-3 text-center foods" @click="addToCart(food)">
                            <img :src="food.foto" class="card-img-top" alt="food-image">
                            <div class="card-body">
                                <h5 class="card-title">{{ food.nama }}</h5>
                                <p class="card-text text-info"><strong>Rp. {{ food.harga }}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 shadow">
                <h5 class="text-center my-3">Pesanan</h5>
                <div class="list-group">
                    <div v-for="(item, index) in cart" :key="index" class="px-3 mb-3 text-center">
                        <div class="card-body d-flex align-items-center justify-content-between">
                            <img :src="item.foto" alt="food-image" width="70" height="70">
                            <span class="ms-3">{{ item.nama }}</span>
                            <span class="ms-auto text-info fw-bold"><span class="text-dark fw-bold">x{{ item.quantity }}
                                </span>
                                Rp.{{ item.harga.toLocaleString() }}</span>
                        </div>
                    </div>
                </div>

                <div class="mt-2 d-flex justify-content-center ">
                    <button class="w-100 btn btn-sm btn-outline-danger" @click="clearCart()">Clear Chart</button>
                </div>
                <div class="mt-2 d-flex justify-content-center">
                    <button class="w-100 btn btn-sm btn-success" style="margin-right:10px" @click="saveBill()">Save
                        Bill</button>
                    <button class="w-100 btn btn-sm btn-success" style="margin-left:10px" @click="printBill()">Print
                        Bill</button>
                </div>
                <!-- Button trigger modal -->
                <div class="mt-2 mb-2 d-flex justify-content-center ">
                    <button class="text-white w-100 btn btn-sm btn-info" data-bs-toggle="modal"
                        data-bs-target="#chargeModal" @click="charge()">Charge Rp. {{ total.toLocaleString() }}</button>
                </div>
                <!-- Charge Modal -->
                <div class="modal fade" id="chargeModal" tabindex="-1" aria-labelledby="chargeModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Detail pesanan</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="list-group col-lg-8">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">Foto</th>
                                                        <th scope="col">Harga</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in cart" :key="index">
                                                        <td scope="row">{{ index + 1 }}</td>
                                                        <td>{{ item.nama }}</td>
                                                        <td><img :src="item.foto" alt="food-image" width="40" height="40">
                                                        </td>
                                                        <td>Rp.{{ item.harga.toLocaleString() }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-lg-4 p-3 shadow">
                                            <p class="text-center">Uang Pembeli (Rp)</p>
                                            <div class="form-group">
                                                <input type="number" class="form-control" id="inputUangPembeli"
                                                    v-model="uangPembeli">
                                            </div>
                                            <div class="mt-2 mb-3">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <button type="button" class="btn btn-md btn-outline-secondary w-100"
                                                            data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                    <div class="col-lg-6">
                                                        <button type="button" class="btn btn-md btn-primary w-100"
                                                            @click="hitungKembalian()">Pay!</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group text-danger">
                                                <label for="hasilKembalian">Kembalian: <span class="text-dark">Rp. {{
                                                    hasilKembalian.toLocaleString() }}</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="printable-area" class="d-none">
        <h3 class="text-center mb-3">Struk Pembayaran</h3>
        <div class="mb-3">
            <strong>Tanggal:</strong> {{ new Date().toLocaleDateString() }}
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Nama Item</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nama }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>Rp. {{ item.harga }}</td>
                    <td>Rp. {{ item.harga * item.quantity }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="text-end"><strong>Total:</strong></td>
                    <td><strong>Rp. {{ total }}</strong></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
.foods:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

@media print {
    #printable-area table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 10px;
    }

    #printable-area th,
    #printable-area td {
        border: 1px solid black;
        padding: 15px;
    }

    #printable-area th {
        background-color: #f2f2f2;
    }
}
</style>


<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            foods: [
                { nama: "Nasi Goreng", harga: 15000, foto: "https://picsum.photos/id/100/300/200" },
                { nama: "Mie Ayam", harga: 12000, foto: "https://picsum.photos/id/200/300/200" },
                { nama: "Soto Ayam", harga: 20000, foto: "https://picsum.photos/id/400/300/200" },
                { nama: "Tempe Goreng", harga: 20000, foto: "https://picsum.photos/id/500/300/200" },
                { nama: "Nasi Pecel", harga: 20000, foto: "https://picsum.photos/id/600/300/200" },
                { nama: "Sayur Bayam", harga: 20000, foto: "https://picsum.photos/id/700/300/200" },
            ],
            cart: [],
            hasilKembalian: 0,
            uangPembeli: 0,
            baseUrl: import.meta.env.VITE_APP_BASE_URI,
        };
    },
    computed: {
        total() {
            return this.cart.reduce((total, item) => total + item.harga * item.quantity, 0);
        },
    },
    mounted() {
        this.fetchFoods();
    },
    methods: {
        async fetchFoods() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/v1/foods`);
                this.foods = response.data;
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        },
        addToCart(food) {
            const itemIndex = this.cart.findIndex((item) => item.nama === food.nama);
            if (itemIndex >= 0) {
                this.cart[itemIndex].quantity++;
            } else {
                this.cart.push({ nama: food.nama, foto: food.foto, harga: food.harga, quantity: 1 });
            }
        },
        hitungKembalian() {
            const totalBayar = this.total;
            const uangPembeli = this.uangPembeli;
            const kembalian = uangPembeli - totalBayar;
            if (uangPembeli !== 0 || uangPembeli < 0) {
                this.hasilKembalian = kembalian;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Uang pembeli kosong...',
                    text: 'Masukan jumlah uang!',
                })
            }
        },
        clearCart() {
            if (this.cart.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Chart masih kosong!',
                })
            } else {
                this.cart.splice(0, this.cart.length);
            }
        },
        printBill() {
            if (this.cart.length !== 0) {
                const printContent = document.getElementById("printable-area");
                const printWindow = window.open('', '_blank', 'height=400,width=600');
                printWindow.document.write('<html><head><title>Struk Pesanan</title>');
                printWindow.document.write('</head><body >');
                printWindow.document.write(printContent.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Pesanan masih kosong!',
                })
            }
        },
        saveBill() {
            if (this.cart.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Pesanan masih kosong!',
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Bill has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
    },
}
</script>
