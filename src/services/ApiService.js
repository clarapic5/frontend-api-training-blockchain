import { Api, JsonRpc } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'

// Main action call to blockchain
async function takeAction(action, dataValue) {
    const privateKey = localStorage.getItem("user_key");
    const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    // Main call to blockchain after setting action, account_name and data
    try {
        const resultWithConfig = await api.transact({
            actions: [{
                account: process.env.REACT_APP_EOS_CONTRACT_NAME,
                name: action,
                authorization: [{
                    actor: localStorage.getItem("user_account"),
                    permission: 'active',
                }],
                data: dataValue,
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        return resultWithConfig;
    } catch (err) {
        throw (err)
    }
}

class ApiService {
    //AQUI TRABAJAS CON REDUX Y OBTIENES EL ACCOUNT_NAME QUE HAYA EN CHROME GUARDADO
    //Para utilizar esta funcion en algun componente usar:
    //import UserAction to getCurrentUser
    static getCurrentUser() {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem("user_account")) {
                return reject();
            }
            takeAction("login", { username: localStorage.getItem("user_account") })
                .then(() => {
                    resolve(localStorage.getItem("user_account"));
                })
                .catch(err => {
                    localStorage.removeItem("user_account");
                    localStorage.removeItem("user_key");
                    reject(err);
                });
        });
    }

    //Login transaction, put the data on blockchain
    //Private key
    static login({ username, key }) {
        return new Promise((resolve, reject) => {
            localStorage.setItem("user_account", username);
            localStorage.setItem("user_key", key);
            takeAction("login", { username: username })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    localStorage.removeItem("user_account");
                    localStorage.removeItem("user_key");
                    reject(err);
                });
        });
    }


    //Insert activity transaction
    static insert(id, duration, dist, sp1, sp2, sp3, sp4, sp5, sp6, sp7, avg_sp,
        alt, hrt1, hrt2, hrt3, hrt4, hrt5, hrt6, hrt7, avg_hrt, cal, weather, temp) {
        return new Promise((resolve, reject) => {
            //localStorage.setItem("IDACTIVITY ", id);
            //localStorage.setItem("distancia ", dist);
            localStorage.setItem("user", localStorage.getItem("user_account"));
            return takeAction("insert", {
                    activityid: id,
                    username: localStorage.getItem("user_account"),
                    duration: duration,
                    distance: dist,
                    speed1: sp1,
                    speed2: sp2,
                    speed3: sp3,
                    speed4: sp4,
                    speed5: sp5,
                    speed6: sp6,
                    speed7: sp7,
                    avg_speed: avg_sp,
                    altitude: alt,
                    hrate1: hrt1,
                    hrate2: hrt2,
                    hrate3: hrt3,
                    hrate4: hrt4,
                    hrate5: hrt5,
                    hrate6: hrt6,
                    hrate7: hrt7,
                    avg_hrate: avg_hrt,
                    calories: cal,
                    weather: weather,
                    temperature: temp,
                    shared: false, //by default
                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static share(id) {
        return new Promise((resolve, reject) => {
            takeAction("share", { activityid: id, username: localStorage.getItem("user_account"), })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }



    //Remove activity transaction by id
    static remove(id) {
        return new Promise((resolve, reject) => {
            return takeAction("remove", {
                    activityid: id,
                    username: localStorage.getItem("user_account")
                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }


    //NO Necesitas la key porque leer datos es publico
    static async getUserByName(username) {
        try {
            const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
            const result = await rpc.get_table_rows({
                "json": true,
                "code": process.env.REACT_APP_EOS_CONTRACT_NAME, // contract who owns the table
                "scope": process.env.REACT_APP_EOS_CONTRACT_NAME, // scope of the table
                "table": "users", // name of the table as specified by the contract abi
                "limit": 1,
                "lower_bound": username,
            });
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }
    }
    static async getAllActivities() {
        const username = localStorage.getItem("user_account");
        localStorage.setItem("STATE", "entre weeey");
        try {
            const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
            const result = await rpc.get_table_rows({
                "json": true,
                "code": process.env.REACT_APP_EOS_CONTRACT_NAME, // contract who owns the table
                "scope": process.env.REACT_APP_EOS_CONTRACT_NAME, // scope of the table
                "table": "activities", // name of the table as specified by the contract abi
                "limit": 10000000,
                // "lower_bound": username,
            });
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    }

}

export default ApiService;