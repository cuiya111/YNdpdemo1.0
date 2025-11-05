<template>
    <div class="info-box">
        <img :src="img_src" class="icon">
        <div class="info">
            <span class="normal">{{ title }}</span>
            <span class="number">{{ record }}</span>
            <span class="normal">个</span>
            
        </div>
    </div>
</template>



<script lang="ts" setup>

    import { ref, onMounted } from "vue";
    import iconBook from "@/assets/images/icon1.png";
    import iconFile from "@/assets/images/icon2.png";
    import iconCar from "@/assets/images/icon1.png";

    type iconType = "book" | "file" | "car";

    const img_src = ref(iconBook);

    const props = withDefaults(
        defineProps<{
            icon?: iconType;
            title: string;
            record: string;
        }>(), 
        {
            icon: "book",
        }
    );
    onMounted(() => {
        if (props.icon === "book") {
            img_src.value = iconBook;
        } else if (props.icon === "file") {
            img_src.value = iconFile;
        } else if (props.icon === "car") {
            img_src.value = iconCar;
        }
    });
</script>

<style scoped >
.info-box {
  display: flex;
  color: #fff;
  align-items: center;
  font-family: 'Source Han Sans', sans-serif;
  
  .icon{
    height: 80%;
  }
  .info{
    display: flex;
    flex-direction: row;
    height: 80%;
    align-items: center;
  }
  .normal{
    align-items: center ;
    font-size: 12px;
    height: 50%;
    font-weight: lighter;
  }
  .number{
    align-items: center ;
    font-weight: bold;
    font-size: 18px;
    /* padding-bottom: 5%; */
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>