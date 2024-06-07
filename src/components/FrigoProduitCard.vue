<script setup>

defineProps(["produit", "handlerAdd", "handlerRemove", "handlerDelete"]);

</script>

<template>
  <v-col cols="12" sm="6" md="5" lg="4" xl="4">
    <v-card class="card">
      <v-img class="image" :src="`${produit.photo}`" :alt="`${produit.nom}` + ' image'" :title="`${produit.nom}`" cover>
        <v-card-text v-if="produit.photo === ''" class="flex-fill align-content-center justify-content-center">
          {{ produit.nom }}
        </v-card-text>
        <v-btn @click="handlerDelete(produit.id)" size="small" class="top-right px-0" icon="mdi-delete"
          density="comfortable"></v-btn>
      </v-img>
      <v-card-title class="card-title">
        <v-container>
          <v-row>
            <v-col class="pa-0" cols="12">
              {{ produit.qte }} - {{ produit.nom }}
              <br>
              <v-btn @click="handlerRemove(produit)" size="x-small">-</v-btn>
              <v-btn @click="handlerAdd(produit)" size="x-small">+</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<style scoped>
.card-title {
  background-color: rgba(189, 255, 214, 0.65);
  font-size: math;
  padding: 0;
  min-width: 50px;
}

.card {
  background-color: rgba(104, 25, 25, 0);
  margin: 0;
  min-width: 40px;
}

.top-right {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(111, 175, 107, 0.65);

}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: math;
}

.image {
  height: 10vh;
  min-height: 40px;
  object-fit: cover;
}
</style>
