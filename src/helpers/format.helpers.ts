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

    static hexToHsl(hex: string): number {
        // 1. Converter HEX para RGB
        let r = 0, g = 0, b = 0;

        // Limpar o hash e tratar formatos curtos/longos
        const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

        // ... [O código para converter HEX para RGB está correto e foi omitido para brevidade]
        // (Apenas certifique-se de que r, g, b sejam definidos aqui)

        if (sanitizedHex.length === 3) {
            r = parseInt(sanitizedHex[0] + sanitizedHex[0], 16);
            g = parseInt(sanitizedHex[1] + sanitizedHex[1], 16);
            b = parseInt(sanitizedHex[2] + sanitizedHex[2], 16);
        } else if (sanitizedHex.length === 6) {
            r = parseInt(sanitizedHex.substring(0, 2), 16);
            g = parseInt(sanitizedHex.substring(2, 4), 16);
            b = parseInt(sanitizedHex.substring(4, 6), 16);
        } else {
            console.error(`HEX inválido fornecido: ${hex}`);
            return 0;
        }

        // Normalizar RGB para 0-1
        r /= 255;
        g /= 255;
        b /= 255;

        // 2. Converter RGB para HSL
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        // DECLARAÇÃO CORRETA: Declare h, s, e l com seus tipos e valores iniciais
        let h: number = 0; // Inicialize h com 0 (necessário para o caso acromático)
        let s: number = 0;
        let l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Acromático: H é 0
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            // CORREÇÃO: h está agora garantido de ter um valor numérico antes da divisão
            h /= 6;
        }

        // Retorna a Tonalidade (H) arredondada em graus (0-360)
        return Math.round(h * 360);
    }

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
    static phoneMask = [
        "(",
        /[1-9]/,
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