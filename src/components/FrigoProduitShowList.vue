<script setup>
import { onMounted, reactive } from 'vue';
import Produit from '@/js/Produit';
import FrigoProduitCard from '@/components/FrigoProduitCard.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import AddNewItemComponent from '@/components/AddNewItemComponent.vue';

const listeProduits = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/10/produits";

let searchQuery = '';

async function fetchProduits() {
  try {
    const response = await fetch(`${url}?search=${searchQuery}`);
    const produits = await response.json();
    listeProduits.splice(0, listeProduits.length, ...produits.map(p => new Produit(p.id, p.nom, p.qte, p.photo)));
    checkIfSomeItemsAreAtZero();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

async function fetchForPostPut(fetchUrl, fetchOptions) {
  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const result = await response.json();
    if (result.status !== 1) {
      console.error("Request failed with options:", fetchOptions);
    }
    fetchProduits();
  } catch (error) {
    console.error("Network error:", error, fetchOptions);
  }
}

function checkIfSomeItemsAreAtZero() {
  listeProduits.forEach((produit, index) => {
    if (produit.qte <= 0) {
      handlerDelete(produit.id);
    }
  });
}

async function handlerDelete(idProduit) {
  const fetchOptionsDelete = { method: "DELETE" };
  try {
    const response = await fetch(`${url}/${idProduit}`, fetchOptionsDelete);
    const result = await response.json();
    if (result.status !== 1) {
      console.error(`Delete failed for product ${idProduit}:`, result);
    }
    fetchProduits();
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

function handlerUpdateSearchQuery(newSearchQuery) {
  searchQuery = newSearchQuery;
  fetchProduits();
}

function handlerAdd(produit) {
  fetchForPostPut(url, produit.addQtyOption);
}

function handlerRemove(produit) {
  fetchForPostPut(url, produit.removeQtyOption);
}

onMounted(() => {
  fetchProduits();
});
</script>

<template>
  <div class="frigo">
    <v-container class="d-flex pa-0">
      <SearchComponent class="justify-start" @handlerUpdateSearchQuery="handlerUpdateSearchQuery"></SearchComponent>
      <AddNewItemComponent class="justify-end" @handlerAddProduits="handlerAdd"></AddNewItemComponent>
    </v-container>
    <v-row dense>
      <FrigoProduitCard class="frigoCard pt-5" v-for="produit in listeProduits" :key="`${produit.id}`"
        :produit="produit" :handlerRemove="handlerRemove" :handlerAdd="handlerAdd" :handlerDelete="handlerDelete" />
    </v-row>
  </div>
</template>

<style scoped></style>
