<template>
  <div class="content-wrapper">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title">Додати авто</h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->
      <form @submit.prevent="submit">
          <div class="card-body col-md-4">
            <div class="form-group input-group-lg">
              <label for="name">Ім'я</label>
              <input class="form-control" id="name" v-model="name" type="text"
                     required placeholder="Вкажіть ваше ім'я">
            </div>
            <div class="form-group input-group-lg">
              <label for="gov_number">Держномер</label>
              <input class="form-control" id="gov_number" v-model="gov_number" type="text"
                     required placeholder="Вкажіть держномер авто">
            </div>
            <div class="form-group input-group-lg">
              <label for="color">Колір</label>
              <input class="form-control" id="color" v-model="color" type="text"
                     required placeholder="Вкажіть колір авто">
            </div>
            <div class="form-group input-group-lg">
              <label for="vin_number">Vin номер авто</label>
              <input class="form-control" id="vin_number" v-model="vin_number" type="text"
                     required placeholder="Вкажіть Vin номер авто">
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Додати</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "CreateComponent",
  data() {
    return {
      name: null,
      gov_number: null,
      color: null,
      vin_number: null,
    }
  },
  methods: {

    async submit() {

      try {
        await axios.post('/api/v1/cars', {
          name: this.name,
          gov_number: this.gov_number,
          color: this.color,
          vin_number: this.vin_number
        })
            .then(res => {
              res.status === 201 ? router.push('/cars') : ''
              res.status === 201 ? alert(res.data.message) : ''
            })
      } catch (e) {
        alert(e.response.data.message)
      }
    },

  },

}


</script>

<style scoped lang="scss">

</style>