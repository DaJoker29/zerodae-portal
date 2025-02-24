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
  const article = document.createElement("article");
  const h3 = document.createElement("h3");
  h3.textContent = `${sub.domain.toUpperCase()} — ${sub.plan}`;
  article.append(h3);

  // Build Site Info
  const siteInfo = document.createElement("section");
  siteInfo.classList.add("site-info");

  const p0 = document.createElement("p");
  p0.textContent = `Price: `;
  const span0 = document.createElement("span");
  span0.textContent = `$${sub.price} / ${sub.billingCycle}ly`;
  p0.append(span0);

  siteInfo.append(p0);

  const p1 = document.createElement("p");
  p1.textContent = `Started: `;
  const span1 = document.createElement("span");
  span1.textContent = new Date(sub.createdAt).toLocaleDateString();
  p1.append(span1);

  siteInfo.append(p1);

  if (sub.autoRenew === true) {
    const p2 = document.createElement("p");
    p2.textContent = `Auto-Renew: `;
    const span2 = document.createElement("span");
    span2.textContent = new Date(sub.renewalDate).toLocaleDateString();
    p2.append(span2);

    siteInfo.append(p2);
  }

  // Build Site Addons

  const addons = document.createElement("section");
  addons.classList.add("site-addons");
  const ul = document.createElement("ul");
  const domains = sub.altDomains;
  const addOns = sub.addOns;

  if (domains.length > 0) {
    const li = document.createElement("li");
    li.textContent = `Additional Domains: ${domains.join(", ")}`;
    ul.append(li);
  }

  if (addOns.length > 0) {
    const li = document.createElement("li");
    li.textContent = `Add-ons: ${addOns.join(", ")}`;
    ul.append(li);
  }

  addons.append(ul);

  // Populate DOM
  const div = document.createElement("div");
  div.append(siteInfo);
  div.append(addons);
  article.appendChild(div);

  sublist.prepend(article);
}

function buildSiteList() {
  const subCounter = document.querySelector("[data-subscription-count]");

  subCounter.textContent = subscriptions.length;

  subscriptions.forEach((sub) => buildSubscriptionItem(sub));
}

export { init };
