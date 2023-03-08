<template>
    <div class="container shadow px-4 py-2 mt-4" v-if="showForm">
        <h5 class="my-4 text-info">Tambahkan menu</h5>
        <form @submit.prevent="saveFood" role="form" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="title" class="form-label">Nama menu *</label>
                <input type="text" class="form-control" id="title" required v-model="nama">
            </div>
            <div class="mb-5">
                <label for="formFileMultiple" class="form-label">Foto *</label>
                <input class="form-control" type="file" id="formFileMultiple" ref="fileInput" name="foto" multiple>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text bg-info text-white" id="harga">Rp.</span>
                <input type="number" class="form-control" aria-label="Harga" aria-describedby="harga" v-model="harga">
            </div>
            <div class="mb-3 d-flex justify-content-end">
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    </div>

    <div class="container" v-else>
        <p class="my-4 text-muted">Tambahkan menu makanan yang ada di resto</p>
        <div class="container shadow p-4">
            <button type="button" class="my-3 btn btn-info text-white btn-md" @click="showForm = true" v-if="!showForm">+
                Tambah Menu</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Harga</th>
                    </tr>
                </thead>
                <tbody class="align-items-center justify-content-center">
                    <tr v-for="(item, index) in foods" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.nama }}</td>
                        <td><img :src="item.foto" alt="food-image" width="50" height="50">
                        </td>
                        <td>Rp.{{ item.harga.toLocaleString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

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
            nama: '',
            harga: 0,
            showForm: false,
            baseUrl: import.meta.env.VITE_APP_BASE_URI,
        }

    }, mounted() {
        this.fetchFoods();
    }, methods: {
        async fetchFoods() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/v1/foods`);
                this.foods = response.data;
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        },
        saveFood() {
            const data = new FormData();
            data.append('nama', this.nama);
            data.append('harga', this.harga);
            data.append('foto', this.$refs.fileInput.files[0]);
            console.log(data)
            axios.post(`${this.baseUrl}/api/v1/foods`, data)
                .then(response => {
                    console.log(response.data);
                    this.showForm = false;
                    this.nama = '';
                    this.harga = '';
                    this.$refs.foto.value = null;
                    this.getFoods();
                    this.$emit('food-added', response.data.data);
                    this.showForm = false;
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        },
    }

}
</script>