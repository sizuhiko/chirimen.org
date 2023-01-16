// Example for Aitendo  8x8 LED Matrix LED ht16k33 module kit
// https://www.aitendo.com/product/12822
// https://www.aitendo.com/product/12850
// https://www.aitendo.com/product/12823


import { requestI2CAccess } from "./node_modules/node-web-i2c/index.js";
import HT16K33 from "@chirimen/ht16k33";
const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

main();

const iconPattern =[
0,0,1,1,1,1,0,0,
0,1,0,0,0,0,1,0,
1,0,1,0,0,1,0,1,
1,0,0,0,0,0,0,1,
1,0,1,0,0,1,0,1,
1,0,0,1,1,0,0,1,
0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,
]; // スマイルマーク

const iconPattern2 =[
1,0,0,0,0,0,0,1,
0,1,0,0,0,0,1,0,
0,0,1,1,1,1,0,0,
0,1,1,1,1,1,1,0,
1,1,0,1,1,0,1,1,
0,1,1,1,1,1,1,0,
0,0,1,0,0,1,0,0,
1,1,0,0,0,0,1,1
]; // インベーダー

const iconPattern3 =[
0,1,0,0,0,0,1,0,
1,1,1,1,1,1,1,0,
1,0,0,1,0,0,1,0,
1,1,0,1,1,0,1,0,
1,0,0,1,0,0,1,0,
1,1,1,1,1,1,1,0,
0,1,1,1,1,1,1,1,
0,1,0,1,0,1,0,1
]; // 犬

async function main() {
	const i2cAccess = await requestI2CAccess();
	const port = i2cAccess.ports.get(1);
	const ht = new HT16K33(port);
	await ht.init();
	ht.setAitendo8x8(); // この関数でaitendoの8x8LEDモジュールの配線に切り替える
	
	//await ht.set_blink(ht.HT16K33_BLINK_1HZ);
	//await ht.set_brightness(6);
	
	while(true){
		ht.set_8x8_array(iconPattern);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_8x8_array(iconPattern2);
		await ht.write_display();
		await sleep(1000);
		
		ht.set_8x8_array(iconPattern3);
		await ht.write_display();
		await sleep(1000);
		
		/** LEDを一個づつ設定する関数の使用例
		for ( var i = 0 ; i < 128 ; i++ ){
			ht.set_led(i, 1);
		}
		await ht.write_display();
		await sleep(1000);
		**/
	}
}
