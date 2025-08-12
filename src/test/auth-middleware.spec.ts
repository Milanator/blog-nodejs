import { expect } from "chai";
import auth from "./../middlewares/auth.ts";
import jwt from "jsonwebtoken";
import sinon from "sinon";

describe("Auth Middleware", () => {
  it("Throw error if no authorization header", () => {
    const req = {
      get: () => {
        return undefined;
      },
    };

    expect(auth.bind(this, req, {}, () => {})).to.throw("Not authenticated.");
  });

  it("Request has user", () => {
    const req = {
      get: () => {
        return "Bearer daskdasffjds";
      },
    };

    const decodedToken = { name: "ABC", email: "email" };

    // stubs - override function or object in testing

    // affect globally all tests after that
    // jwt.verify = () => (decodedToken);

    // optimization - only affect this specific test
    sinon.stub(jwt, "verify").returns(decodedToken);

    auth(req, {}, () => {});

    expect(req).to.have.property("user");

    expect(jwt.verify.called).to.be.true;

    // expect(req).to.have.property("user", decodedToken);

    jwt.verify.restore();
  });
});
