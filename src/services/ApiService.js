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

    //HACE LA TRANSACCION Y METE DATOS EN LA BLOCKCHAIN (INSERT) 
    //Necesitas la key (SOLO TU PUEDES HACER LA TRANSACCION)
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
        /*static playCard(cardIdx) {
        return takeAction("playcard", { username: localStorage.getItem("cardgame_account"), player_card_idx: cardIdx });
    }*/
        /*
            static insert({ id, time, dist, speed, alt, hrate, cal, incl, cad, temp }) {
                return new Promise((resolve, reject) => {
                    localStorage.setItem("IDACTIVITY ", id);
                    localStorage.setItem("distancia ", dist);
                    localStorage.setItem("user", localStorage.getItem("user_account"));
                    localStorage.setItem("STATE", "none");
                    takeAction("insert", {
                            activityid: 2,
                            username: localStorage.getItem("user_account"),
                            training_time: 1,
                            distance: 1.0,
                            speed: 1.0,
                            altitude: 1,
                            heart_rate: 1,
                            calories: 1,
                            incline: 1,
                            cadence: 1,
                            temperature: 1.0
                        })
                        .then(() => {
                            localStorage.setItem("STATE", "yes");
                            resolve();
                        })
                        .catch(err => {
                            localStorage.setItem("STATE", "no");
                            reject(err);
                        });
                });
            }*/

    static insert(id, time, dist, speed, alt, hrate, cal, incl, cad, temp) {
        localStorage.setItem("IDACTIVITY ", id);
        localStorage.setItem("distancia ", dist);
        localStorage.setItem("user", localStorage.getItem("user_account"));
        return takeAction("insert", {
            activityid: id,
            username: localStorage.getItem("user_account"),
            training_time: time,
            distance: dist,
            speed: speed,
            altitude: alt,
            heart_rate: hrate,
            calories: cal,
            incline: incl,
            cadence: cad,
            temperature: temp
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
    static async getActivityByName() {
        const username = localStorage.getItem("user_account");
        localStorage.setItem("STATE", "entre weeey");
        try {
            const rpc = new JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
            const result = await rpc.get_table_rows({
                "json": true,
                "code": process.env.REACT_APP_EOS_CONTRACT_NAME, // contract who owns the table
                "scope": process.env.REACT_APP_EOS_CONTRACT_NAME, // scope of the table
                "table": "activities", // name of the table as specified by the contract abi
                "limit": 6,
                // "lower_bound": username,
            });
            return result.rows;
        } catch (err) {
            console.error(err);
        }
    }

}

export default ApiService;