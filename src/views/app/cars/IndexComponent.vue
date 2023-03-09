<template>
  <div class="content-wrapper">
    <div class="col-12 py-3 mx-3">
      <router-link :to="{name: 'car.create'}">
        <a class="btn btn-primary">Нова машина</a>
      </router-link>
    </div>
    <div class="container form-group mx-3">
      <h4>Фільтри</h4>
      <div class="checkboxes">
        <div style="width: 150px">Марка автомобіля:</div>
        <div style="padding-left: 10px" v-for="manufacturer in manufacturers">
          <label>
            <input type="checkbox" :value="manufacturer"
                   v-model="filters.manufacturers_filter"> {{ manufacturer }}
          </label>
        </div>
      </div>
      <div class="checkboxes">
        <div style="width: 150px">Модель автомобіля:</div>
        <div style="padding-left: 10px" v-for="model in models">
          <label>
            <input type="checkbox" :value="model"
                   v-model="filters.models_filter"> {{ model }}
          </label>
        </div>
      </div>
      <div class="checkboxes">
        <div style="width: 150px">Рік виробництва:</div>
        <div style="padding-left: 10px" v-for="year in years">
          <label>
            <input type="checkbox" :value="year"
                   v-model="filters.years_filter"> {{ year }}
          </label>
        </div>
      </div>
    </div>
    <div class="container mx-3" style="max-width: 500px;">
      <label for="keyword">Пошук по імені/Держномеру/Vin-коду</label>
      <div class="input-group input-group-lg mb-3">
        <div class="input-group-prepend">
          <button @click.prevent="getCars(1,field,keyword)" type="button"
                  class="btn btn-outline-primary" data-toggle="dropdown">
            Знайти
          </button>
        </div>
        <input @keydown.enter="getCars(1,field,keyword)" class="form-control" id="keyword"
               v-model="keyword" type="text"
               placeholder="Введіть ім'я, держномер або VIN">
      </div>
    </div>
    <div class="row col-12 mx-2">
      <div class="col-12">
        <div class="card">
          <div style="display: flex; justify-content: space-between;align-items:center;padding: 10px 40px">
            <h3 class="card-title">Список викрадених авто</h3>
            <button
                @click.prevent="downloadFile(1)"
                class="btn btn-success">Експортувати
            </button>
          </div>
          <!-- /.card-header -->
          <div style="color: #000" class="py-3">
            <table>
              <thead>
              <tr>
                <th>Дія</th>
                <th @click.prevent="getCars(page,'name', keyword)">
                  Ім'я ⇵
                </th>
                <th @click.prevent="getCars(page,'gov_number', keyword)">
                  Держномер ⇵
                </th>
                <th @click.prevent="getCars(page,'vin_number', keyword)">
                  Vin код ⇵
                </th>
                <th @click.prevent="getCars(page,'color', keyword)">
                  Колір ⇵
                </th>
                <th @click.prevent="getCars(page,'manufacturer', keyword)">
                  Марка ⇵
                </th>
                <th @click.prevent="getCars(page,'model', keyword)">
                  Модель ⇵
                </th>
                <th @click.prevent="getCars(page,'year', keyword)">
                  Рік ⇵
                </th>
                <th>Видалити</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="car in cars">
                <td>
                  <router-link :to="{name: 'car.edit', params: { id: car.id }}"
                               @click.prevent="this.$store.commit('main/setProps', car)">
                    <a class="text-success" href=""><i class="fas fa-edit"></i></a>
                  </router-link>
                </td>
                <td>{{ car.name }}</td>
                <td>{{ car.gov_number }}</td>
                <td>{{ car.vin_number }}</td>
                <td>{{ car.color }}</td>
                <td>{{ car.manufacturer }}</td>
                <td>{{ car.model }}</td>
                <td>{{ car.year }}</td>
                <td>
                  <a class="text-danger" @click.prevent="getDelete(car.id)" style="padding-left: 20px"
                     href=""><i class="fas fa-trash-alt"></i></a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
    <div class="row" v-if="paginate !== null && paginate.total > 10">
      <div class="col-sm-12 col-md-5" style="padding-left: 20px;padding-right: 20px">
        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
          <ul class="pagination">
            <li v-if="paginate.current_page !== 1" class="page-item">
              <a
                  @click.prevent="getCars(paginate.current_page -1, field,keyword, true)"
                  class="page-link" href=""
                  tabindex="-1">
                <span class="fa fa-arrow-left"></span></a></li>
            <li v-for="link in paginate.links" :class="link.active ? 'active' : ''" class="page-item"
                aria-current="page">
              <template v-if="Number(link.label)">
                <a
                    @click.prevent="getCars(link.label, field,keyword, true)"
                    class="page-link" href="">{{ link.label }}
                  <span
                      class="sr-only"></span></a>
              </template>
            </li>
            <li v-if="paginate.current_page !== paginate.last_page" class="page-item">
              <a class="page-link" href=""
                 @click.prevent="getCars(paginate.current_page +1, field,keyword, true)">
                <span class="fa fa-arrow-right"></span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "IndexComponent",
  data() {
    return {
      page: null,
      cars: null,
      paginate: null,
      keyword: null,
      direction: 'asc',
      field: null,
      page_action: false,
      filters_arr: null,
      manufacturers: null,
      models: null,
      years: null,
      export: null,
      filters: {
        manufacturers_filter: [],
        models_filter: [],
        years_filter: [],
      },
    }
  },
  mounted() {
    this.getCars()
  },
  watch: {
    filters: {
      handler() {
        this.getCars(1, this.field, this.keyword)
      },
      deep: true
    }
  },
  methods: {

    async getCars(page = 1, sort, keyword, page_action = false, exp) {
      try {
        this.export = exp
        this.page_action = page_action
        this.keyword = keyword
        this.field = sort
        if (this.field && this.page_action === false) {
          this.direction === 'asc' ? this.direction = 'desc' : this.direction = 'asc'
        }

        await axios.get('/api/v1/cars', {
          params: {
            page: page,
            keyword: this.keyword || undefined,
            field: this.field || '',
            direction: this.direction || '',
            export: this.export || undefined,
            manufacturers: this.filters.manufacturers_filter,
            models: this.filters.models_filter,
            years: this.filters.years_filter,
          }
        })
            .then(res => {
              this.cars = res.data.data
              this.paginate = res.data.meta
              this.page = res.data.meta.current_page
              this.manufacturers = res.data.filters.manufacturers
              this.models = res.data.filters.models
              this.years = res.data.filters.years
            });
      } catch (e) {

      }
    },

    downloadFile(exp) {
      axios.get('/api/v1/cars', {
        responseType: 'arraybuffer',
        params: {
          keyword: this.keyword || undefined,
          field: this.field || '',
          direction: this.direction || '',
          export: exp,
          manufacturers: this.filters.manufacturers_filter,
          models: this.filters.models_filter,
          years: this.filters.years_filter,
        }})
          .then(res => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'cars.xlsx');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
    },

    getDelete(id) {
      try {
        axios.delete('/api/v1/cars/' + id)
            .then(res => {
              if (res.status === 200) {
                this.getCars()
              }
            })
      } catch (e) {

      }
    },

  },
}
</script>

<style scoped lang="scss">
// sets

$gl-ms: "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs: "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm: "screen and (max-width: 48em)"; // max 768px
$gl-md: "screen and (max-width: 64em)"; // max 1024px
$gl-lg: "screen and (max-width: 80em)"; // max 1280px

// table style

table {
  border-spacing: 1px;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  width: 95%;
  margin: 0 auto;
  position: relative;
  -webkit-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -moz-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  -o-box-shadow: 0 18px 60px rgba(23, 26, 33, 0.05);
  box-shadow: 0 38px 100px rgba(23, 26, 33, 0.2);

  * {
    position: relative
  }

  td, th {
    padding-left: 18px;
    padding-right: 18px;

  }

  th {
    cursor: pointer;
  }

  thead tr {
    height: 60px;
    background: #f5c34b;
    font-size: 16px;
  }

  tbody tr {
    height: 48px;
    border-bottom: 1px solid #E3F1D5;

    &:last-child {
      border: 0;
    }
  }

  td, th {
    text-align: left;

    &.l {
      text-align: right
    }

    &.c {
      text-align: center
    }

    &.r {
      text-align: center
    }
  }
}


@media #{$gl-xs}              {

  table {
    display: block;

    > *, tr, td, th {
      display: block
    }

    thead {
      display: none
    }

    tbody tr {
      height: auto;
      padding: 8px 0;

      td {
        padding-left: 45%;
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 30px
        }

        &:before {
          position: absolute;
          font-weight: 700;
          width: 40%;
          left: 10px;
          top: 0
        }

        &:nth-child(1):before {
          content: "Дія";
        }

        &:nth-child(2):before {
          content: "Ім'я";
        }

        &:nth-child(3):before {
          content: "Держномер";
        }

        &:nth-child(4):before {
          content: "Vin код";
        }

        &:nth-child(5):before {
          content: "Колір";
        }

        &:nth-child(6):before {
          content: "Марка";
        }

        &:nth-child(7):before {
          content: "Модель";
        }

        &:nth-child(8):before {
          content: "Рік";
        }

        &:nth-child(9):before {
          content: "Видалити";
        }

      }
    }
  }
}


// body style

body {
  background: #9BC86A;
  font: 400 14px 'Calibri', 'Arial';
  padding: 20px;
}

blockquote {
  color: white;
  text-align: center;
}
</style>