export const formatNumber = n =>  {
	let value = Number(n);
    value = value.toFixed(2);
    value = value.replace(/([0-9])([0-9]{2})$/, '$1.$2').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    return value;
}