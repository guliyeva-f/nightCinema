import { API } from "./endpoints";

let $api = (service, params)=> {
    const services = API

    console.log(services);
    console.log(services[service]);

    let url = service;
    if (params) {
        const query_params = {};
        let has_query_params = false;

        for (const [key, value] of Object.entries(params)) {
            let replaced = false;
            url = url.replaceAll(`{${key}}`, () => {
                replaced = true;
                return value;
            });
            if (!replaced) {
                has_query_params = true;
                query_params[key] = value;
            }
        }

        if (has_query_params) {
            const param = new URLSearchParams(query_params);
            url += `?${param.toString()}`;
        }
    }
    url = url.replaceAll('{lang}');

    return url;
};

export {$api};
