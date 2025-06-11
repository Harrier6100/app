import { ref } from 'vue';

export const useShow = () => {
    const isShow = ref(false);

    const show = () => {
        isShow.value = true;
    };

    const hide = () => {
        isShow.value = false;
    };

    const toggle = () => {
        isShow.value = !isShow.value;
    };

    return {
        isShow,
        show,
        hide,
        toggle,
    };
};