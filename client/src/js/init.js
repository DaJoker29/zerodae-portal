import users from "../../data/users.js";
import subscriptions from "../../data/subscriptions.js";

const sublist = document.querySelector(".list__all-subscriptions");

const init = () => {
  buildHeader(users[0]);
  buildSiteList();
};

function buildHeader(user) {
  const status = document.querySelector(".status-tag");
  if (user.status === "active") {
    status.textContent = "ACTIVE";
    status.classList.remove("is-inactive");
    status.classList.add("is-active");
  }

  const name = document.querySelector(".heading__account-holder");
  name.textContent = `${user.first_name} ${user.last_name}`;

  const id = document.querySelector(".account-id");
  id.textContent = user.id;

  const referralCode = document.querySelector(".referral-code-output");
  referralCode.textContent = user.referral_code;

  const company = document.querySelector(".company-name");
  company.textContent = user.company;
}

function buildSubscriptionItem(sub) {
  const template = document.querySelector("#template-subscription");
  const clone = template.content.cloneNode(true);

  clone.querySelector(
    "[data-domain]"
  ).textContent = `${sub.domain.toUpperCase()}`;
  clone.querySelector(
    "[data-plan]"
  ).textContent = `${sub.plan.name} — $${sub.plan.monthlyPrice}/month`;

  if (sub.status === "active") {
    clone.querySelector("[data-status]").classList.add("is-active");

    if (sub.autoRenew === true) {
      clone.querySelector("[data-auto-renew]").classList.add("has-auto-renew");
      clone.querySelector("[data-renewal]").textContent = new Date(
        sub.renewalDate
      ).toLocaleDateString();
    }

    const total =
      sub.plan.monthlyPrice +
      sub.altDomains.reduce((acc, alt) => acc + alt.monthlyPrice, 0) +
      sub.addOns.reduce((acc, addon) => acc + addon.monthlyPrice, 0);

    clone.querySelector("[data-total]").textContent = `$${total}`;
  } else {
    clone.querySelector("[data-status]").classList.add("is-inactive");
  }

  clone.querySelector("[data-created]").textContent = new Date(
    sub.createdAt
  ).toLocaleDateString();

  if (sub.altDomains.length > 0) {
    const ul = clone.querySelector("[data-alt-domains]");
    sub.altDomains.forEach((alt) => {
      const li = document.createElement("li");
      li.textContent = `${alt.domain} (${
        alt.monthlyPrice === 0 ? "Free" : "$" + alt.monthlyPrice
      })`;
      ul.append(li);
    });
  }

  if (sub.addOns.length > 0) {
    const ul = clone.querySelector("[data-addons]");
    sub.addOns.forEach((addon) => {
      const li = document.createElement("li");
      li.textContent = `${addon.name} (${
        addon.monthlyPrice === 0 ? "Free" : "$" + addon.monthlyPrice
      })`;
      ul.append(li);
    });
  }

  sublist.append(clone);
}

function buildSiteList() {
  const subCounter = document.querySelector("[data-subscription-count]");
  subCounter.textContent = subscriptions.length;
  
  subscriptions.forEach((sub) => buildSubscriptionItem(sub));
}

export { init };
