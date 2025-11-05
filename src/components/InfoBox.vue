<template>
    <div class="info-box">
        <img :src="img_src" class="icon">
        <div class="info">
            <span class="title">{{ title }}</span>
            <div class="record">
              <span class="number">{{ record }}</span>
              <span>小时</span>
            </div>
        </div>
    </div>
</template>



<script lang="ts" setup>

    import { ref, onMounted } from "vue";
    import iconBook from "@/assets/images/clock.png";
    import iconFile from "@/assets/images/bell.png";
    import iconCar from "@/assets/images/setting.png";

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
    padding-left: 12%;
    .icon{
        height: 50%;
    }
    .info{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 60%;
        text-align: left;
        padding-left: 6%;
    }

    .title{
        font-size: 12px;
        height: 50%;
        width: 100%;
        font-weight: lighter;
        align-content: center;
    }

    .record{
      width: 100%;
      font-weight: lighter;
      font-size: 12px;
      align-content: center;
    }
    .number{
      font-weight: bold;
      font-size: 18px;
      padding-right: 4px;
    }

}
</style>