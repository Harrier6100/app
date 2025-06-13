<template>
    <div class="mb-3">物性マスタ</div>

    <form @submit.prevent="save" autocomplete="off">
        <div class="mb-3">
            <label class="form-label" for="code">物性コード</label>
            <div class="d-flex d-flex-row gap-2">
                <input v-for="(n, index) in 5" class="form-control" type="text" :id="index === 0 ? 'code' : ''" v-model="physpropName.codes[index]">
            </div>
            <Message :error="message.code?.error" />
        </div>

        <div class="mb-3">
            <label class="form-label" for="name">物性名</label>
            <input class="form-control" type="text" id="name" v-model="physpropName.name">
            <Message :error="message.name?.error" />
        </div>

        <div class="mb-3">
            <label class="form-label" for="uom">単位</label>
            <input class="form-control" type="text" id="uom" v-model="physpropName.uom">
        </div>

        <div class="mb-3">
            <label class="form-label" for="numberSize">ｎ数</label>
            <input class="form-control" type="number" id="numberSize" v-model="physpropName.numberSize">
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="fw-normal">言語</th>
                    <th class="fw-normal">物性名</th>
                    <th class="fw-normal">単位</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(localize, index) in physpropName.localizes" :key="index">
                    <td style="width: 15%"><input class="form-control" type="text" v-model="localize.lang"></td>
                    <td style="width: 50%"><input class="form-control" type="text" v-model="localize.name"></td>
                    <td style="width: 35%"><input class="form-control" type="text" v-model="localize.uom"></td>
                </tr>
            </tbody>
        </table>

        <div class="mb-3">
            <label class="form-label" for="remarks">備考</label>
            <textarea class="form-control" id="remarks" v-model="physpropName.remarks"></textarea>
        </div>

        <div class="d-flex justify-content-end gap-3">
            <button class="btn btn-secondary" type="button" @click="cancel">キャンセル</button>
            <button class="btn btn-primary" type="submit" :disabled="isLoading">保存</button>
        </div>
    </form>

    <Alert v-if="alerts.length"
        :alerts="alerts"
        @removeAlert="removeAlert"
    />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from '@/composables/useLoading';
import { useMessage } from '@/composables/useMessage';
import { useAlert } from '@/composables/useAlert';
import { api } from '@/services/api';
import Message from '@/components/Message.vue';
import Alert from '@/components/Alert.vue';

const route = useRoute();
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const { message, clearMessage } = useMessage();
const { alerts, addAlert, removeAlert } = useAlert();

const { code } = route.params;
const physpropNameRestore = () => ({
    code: '',
    codes: new Array(5).fill(''),
    name: '',
    uom: '',
    numberSize: 0,
    localizes: ['ja', 'en'].map((lang) => {
        return {
            lang: lang,
            name: '',
            uom: '',
        }
    }),
    remarks: '',
});
const physpropName = ref(physpropNameRestore());

onMounted(() => {
    if (code) {
        fetchPhyspropName(code);
    }
});

watch(() => physpropName.value.codes, (newVal) => {
    newVal.forEach((val, i) => {
        physpropName.value.codes[i] = val.toUpperCase();
    });
    if (newVal[0] === 'A') {
        physpropName.value.code = newVal.slice(0, 4).join('_');
    } else {
        physpropName.value.code = newVal.join('_');
    }
}, { deep: true });

const fetchPhyspropName = async (code) => {
    try {
        startLoading();
        const response = await api.get(`/api/physprop/names/${code}`);
        physpropName.value.code = response.data.code;
        physpropName.value.codes = response.data.code.split('_');
        physpropName.value.name = response.data.name;
        physpropName.value.uom = response.data.uom;
        physpropName.value.numberSize = response.data.numberSize;
        physpropName.value.localizes = response.data.localizes;
        physpropName.value.remarks = response.data.remarks;
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const Validate = {
    run() {
        return ([
            this.code(),
            this.name(),
        ]).every(Boolean);
    },
    code() {
        message.value.code = {};
        if (!physpropName.value.code) {
            message.value.code.error = '物性コードを入力してください。';
        }
        return !message.value.code.error;
    },
    name() {
        message.value.name = {};
        if (!physpropName.value.name) {
            message.value.name.error = '物性名を入力してください。';
        }
        return !message.value.name.error;
    },
};

const save = async () => {
    clearMessage();
    if (!Validate.run()) {
        addAlert('入力内容に誤りがあります。', 'error');
        return;
    }

    try {
        startLoading();
        if (code) {
            await api.put(`/api/physprop/names/${id}`, physpropName.value);
            addAlert('更新しました。', 'success');
        } else {
            await api.post(`/api/physprop/names`, physpropName.value);
            addAlert('作成しました。', 'success');
            physpropName.value = physpropNameRestore();
        }
    } catch (error) {
        addAlert(error.message, 'error');
    } finally {
        stopLoading();
    }
};

const cancel = () => {
    router.push({
        name: 'PhyspropNameList',
        query: window.history.state?.routeQuery,
    });
};
</script>