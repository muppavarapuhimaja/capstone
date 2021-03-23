import sjcl from "sjcl";


export function convStrToSHA256(str) {
    const bitArray = sjcl.hash.sha256.hash(str);
    return sjcl.codec.hex.fromBits(bitArray);
}