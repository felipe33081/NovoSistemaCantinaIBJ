import accounting from "accounting";

export default class Helper {
    static formatPhoneNumber = (phoneNumber: string) => {
        if (!phoneNumber) return ""; // Verifica se o número está vazio ou nulo

        // Suponha que o número de telefone tenha 10 dígitos
        const areaCode = phoneNumber.substring(0, 2);
        const firstPart = phoneNumber.substring(2, 7);
        const secondPart = phoneNumber.substring(7, 11);

        return `(${areaCode}) ${firstPart}-${secondPart}`;
    };

    // static formatPhoneNumber(value: string) {
    //     if (!value) return "";
    //     value = value.replace(/\D/g, '');
    //     value = value.replace(/(\d{2})(\d)/, "($1) $2").slice(0, 14);
    //     value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    //     return value;
    // }

    static formatCEP(value: string) {
        if (!value) return;
        const cep = value.replace(/\D/g, "");
        return cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
    }

    static formatThousand(num: number) {
        accounting.settings = {
            number: {
                precision: 0,
                thousand: ".",
                decimal: ",",
            },
            currency: {
                symbol: "R$",
                format: "%s %v",
                decimal: ",",
                thousand: ".",
                precision: 2,
            },
        };
        if (num === undefined) return "0";
        return accounting.formatNumber(num);
    }

    static formatDocumentNumber(value: string) {
        if (!value || !value.replace) return value;

        const cnpjCpf = value.replace(/\D/g, "");

        if (cnpjCpf.length <= 11) {
            return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
        } else if (cnpjCpf.length <= 14) {
            return cnpjCpf.replace(
                /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                "$1.$2.$3/$4-$5"
            );
        }
        return null;
    }

    static formatCurrency(num: number) {
        if (isNaN(num)) return "N/D";
        if (!num) return "R$ 0,00";

        accounting.settings = {
            currency: {
                format: "%s%v",
                decimal: ",",
                thousand: ".",
                precision: 2,
            },
            number: {
                precision: 2,
                thousand: ".",
                decimal: ",",
            },
        };

        return accounting.formatMoney(num / 100, "R$ ");
    }

    static formatCurrencyAsIs(num: number) {
        if (isNaN(num)) return "N/D";
        if (!num) return "R$ 0,00";

        accounting.settings = {
            currency: {
                format: "%s%v",
                decimal: ",",
                thousand: ".",
                precision: 2,
            },
            number: {
                precision: 2,
                thousand: ".",
                decimal: ",",
            },
        };

        return accounting.formatMoney(num, "R$ ");
    }

    static formatPercentage = (num: number) => {
        if (!num) return 0;
        const formatNumber = `${(num * 100).toFixed(4)}%`;
        return formatNumber.toString().replace(".", ",");
    };

    static formatPercentageAsIs = (num: number) => {
        if (!num) return 0;
        const formatNumber = `${(num).toFixed(4)}%`;
        return formatNumber.toString().replace(".", ",");
    };

    static formatCurrencyWithoutSymbol = (num: number) =>
        this.formatCurrency(num).replace("R$", "");

    static formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            timeZone: "America/Sao_Paulo",
        });
    }

    static formatYearMonthToMonthYear(date: any) {
        if (date != null) {
            return date.substr(5, 2) + "/" + date.substr(0, 4);
        } else {
            return date;
        }
    }

    static translateDate(date: any) {
        if (date) {
            var day = date.substr(0, 2);
            var month = date.substr(3, 2);
            var year = date.substr(6, 4);
            return `${month}/${day}/${year}`;
        } else {
            return date;
        }
    }

    static onlyNumbers = (str: string) => str.replace(/\D/g, "");

    static percentFormat = (number: number) => number.toFixed(2).replace(".", ",") + "%";

    static formatCepForInput = [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ];

    static cpfMask = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ];
    static currencyMask = [/(\d)(?=(\d{3})+(?!\d))/];

    static cnpjMask = [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
    ];
    static phoneNumberMask = [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ];

    static zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
}