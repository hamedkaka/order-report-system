const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const { Customer } = require("../models");

jest.mock("../models");

describe("Customer API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new customer", async () => {
    Customer.findOne.mockResolvedValue(null);
    Customer.create.mockResolvedValue({
      id: 1,
      name: "JEF",
      email: "k@k.com",
      phone: "555",
      password: "hashedpassword",
    });

    const response = await request(app).post("/customer/register").send({
      name: "JEF",
      email: "k@k.com",
      phone: "555",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("customer");
    expect(response.body.customer).toHaveProperty("id");
    expect(response.body.customer).toHaveProperty("name", "JEF");
    expect(response.body.customer).toHaveProperty("email", "k@k.com");
    expect(response.body.customer).toHaveProperty("phone", "555");
    expect(response.body.customer).toHaveProperty("password"); 
    expect(response.body).toHaveProperty("token");
  });

  it("should login a created customer", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    Customer.findOne.mockResolvedValue({
      id: 1,
      name: "JEF",
      email: "login@k.com",
      phone: "555",
      password: hashedPassword,
    });

    const response = await request(app).post("/customer/login").send({
      email: "login@k.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not login with invalid credentials", async () => {
    Customer.findOne.mockResolvedValue(null);

    const response = await request(app).post("/customer/login").send({
      email: "nonexistent@k.com",
      password: "wrongpassword",
    });

    
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Invalid email or password");
  });
});
