import {createApp} from "vue";
import store from '@/store'
import router from "@/router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import LoginDialog from "@/components/dialog/LoginDialog.vue";
import SelfDialog from "@/components/dialog/SelfDialog.vue";

let app = null;
let div = null;
const log = {
    // 展示方法
    show: function () {
        div = document.createElement('div');
        div.setAttribute('id', 'cu-dialog-id');
        document.body.appendChild(div);
        // eslint-disable-next-line vue/one-component-per-file
        app = createApp(SelfDialog);
        app.use(ElementPlus);
        app.use(store)
        app.use(router)
        app.mount(div);
    },
    hide: function () {
        app.unmount();
        div.remove();
    }
};
export default log;