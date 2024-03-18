import axios from "./api";

export async function getCart(userId) {
	try {
		const response = await axios.get(`/carts/getCartRows?userId=${userId}`);

		if (response.status === 200) {
			return response.data;
		} else {
			console.log(response.data);
			return [];
		}
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function addProductToCart(productId, userId, amount = 1) {
	try {
		const response = await axios.post(`/carts/addProduct/`, {
			productId,
			userId,
			amount,
		});

		if (response.status === 200) return response.data;
		else {
			console.log(response.data);
			return [];
		}
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function reduceAmount(userId, productId) {
	try {
		const response = await axios.put(`/carts/reduceAmount/`, {
			userId,
			productId,
		});

		if (response.status === 200) return response.data;
		else {
			console.log(response.data);
			return [];
		}
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function increaseAmount(userId, productId) {
	try {
		const response = await axios.put(`/carts/increaseAmount/`, {
			userId,
			productId,
		});

		if (response.status === 200) return response.data;
		else {
			console.log(response.data);
			return [];
		}
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}