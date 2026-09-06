"""Seed the database with clearly-fictional demo data for local development and demos.

Usage (from backend/):
    python -m scripts.seed

Requires the schema to already exist - run `alembic upgrade head` first. Safe to re-run: it
skips creating a user whose email already exists, so running it twice won't duplicate accounts
(though it will add a fresh round of campaigns/messages/notifications each time).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlmodel import Session, select  # noqa: E402

from app.db.engine import get_engine  # noqa: E402
from app.models.enums import (  # noqa: E402
    ContentType,
    CreatorType,
    MessageType,
    NotificationType,
    Platform,
    PricingModel,
    UserRole,
    VerificationStatus,
)
from app.models.user import User  # noqa: E402
from app.repositories import brands as brands_repo  # noqa: E402
from app.repositories import creators as creators_repo  # noqa: E402
from app.schemas.auth import RegisterRequest  # noqa: E402
from app.schemas.brand import BrandProfileUpdate  # noqa: E402
from app.schemas.campaign import (  # noqa: E402
    CampaignCreate,
    CampaignDeliverableCreate,
    CampaignInviteRequest,
)
from app.schemas.creator import CreatorProfileUpdate  # noqa: E402
from app.schemas.messaging import ConversationCreate, MessageCreate  # noqa: E402
from app.schemas.portfolio import PortfolioItemCreate  # noqa: E402
from app.schemas.pricing import CreatorPricingCreate  # noqa: E402
from app.schemas.saved_search import SavedSearchCreate  # noqa: E402
from app.schemas.shortlist import ShortlistCreate, ShortlistItemCreate  # noqa: E402
from app.schemas.social import SocialAccountConnect  # noqa: E402
from app.services import (  # noqa: E402
    auth_service,
    brand_service,
    campaign_service,
    creator_service,
    messaging_service,
    notification_service,
    portfolio_service,
    pricing_service,
    saved_search_service,
    score_service,
    shortlist_service,
    social_service,
)

DEV_PASSWORD = "DevPassword123!"

CREATORS = [
    {
        "name": "Aarav Sharma",
        "username": "aaravtech",
        "city": "Bengaluru",
        "state": "Karnataka",
        "categories": ["Technology", "SaaS"],
        "niches": ["AI Tools", "Tech Reviews"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE, Platform.LINKEDIN, Platform.X],
        "bio": "B2B SaaS and consumer tech breakdown specialist.",
    },
    {
        "name": "Zoya Khan",
        "username": "zoyacooks",
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "categories": ["Food"],
        "niches": ["Regional Cuisine"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Culinary author and Lucknow culinary historian reviving forgotten royal court recipes.",
    },
    {
        "name": "Kabir Varma",
        "username": "kabirfintech",
        "city": "Gurugram",
        "state": "Haryana",
        "categories": ["Finance"],
        "niches": ["Personal Finance", "Angel Investing"],
        "type": CreatorType.CREATOR_FREELANCER,
        "platforms": [Platform.LINKEDIN, Platform.YOUTUBE],
        "bio": "Chartered Accountant and angel investor teaching millennials to build resilient wealth.",
    },
    {
        "name": "Priya Nambiar",
        "username": "priyafitness",
        "city": "Mumbai",
        "state": "Maharashtra",
        "categories": ["Fitness"],
        "niches": ["Strength Training", "Women's Health"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Certified strength and conditioning coach helping women build functional strength.",
    },
    {
        "name": "Karan Malhotra",
        "username": "karanauto",
        "city": "New Delhi",
        "state": "Delhi",
        "categories": ["Automotive"],
        "niches": ["Car Reviews", "Motorsport"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE],
        "bio": "Automotive journalist and former formula racer giving unfiltered vehicle tests.",
    },
    {
        "name": "Dr. Ananya Ray",
        "username": "drananyaderm",
        "city": "New Delhi",
        "state": "Delhi",
        "categories": ["Beauty", "Health"],
        "niches": ["Dermatology", "Skincare"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "MD Dermatologist debunking skincare myths with peer-reviewed medical evidence.",
    },
    {
        "name": "Rohan Iyer",
        "username": "rohangaming",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "categories": ["Gaming"],
        "niches": ["Esports", "Mobile Gaming"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE, Platform.TWITCH],
        "bio": "Competitive esports player and mobile gaming strategy streamer.",
    },
    {
        "name": "Meera Pillai",
        "username": "meeratravels",
        "city": "Kochi",
        "state": "Kerala",
        "categories": ["Travel"],
        "niches": ["Budget Travel", "South India"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Budget travel creator mapping offbeat South Indian destinations.",
    },
    {
        "name": "Vikram Desai",
        "username": "vikramcomedy",
        "city": "Pune",
        "state": "Maharashtra",
        "categories": ["Comedy"],
        "niches": ["Sketch Comedy", "Stand-up"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Stand-up comedian and sketch writer with a decade on the Pune circuit.",
    },
    {
        "name": "Ishita Bose",
        "username": "ishitaparenting",
        "city": "Kolkata",
        "state": "West Bengal",
        "categories": ["Parenting"],
        "niches": ["Early Childhood", "Montessori"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.INSTAGRAM],
        "bio": "Montessori-trained educator sharing early-childhood parenting frameworks.",
    },
    {
        "name": "Aditya Rao",
        "username": "adityaeduverse",
        "city": "Hyderabad",
        "state": "Telangana",
        "categories": ["Education"],
        "niches": ["Exam Prep", "Career Guidance"],
        "type": CreatorType.CREATOR_FREELANCER,
        "platforms": [Platform.YOUTUBE, Platform.LINKEDIN],
        "bio": "Ex-IIT faculty simplifying competitive exam prep for first-generation learners.",
    },
    {
        "name": "Sana Sheikh",
        "username": "sanafashion",
        "city": "Mumbai",
        "state": "Maharashtra",
        "categories": ["Fashion"],
        "niches": ["Sustainable Fashion", "Styling"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.PINTEREST],
        "bio": "Sustainable fashion stylist championing Indian handloom revival.",
    },
    {
        "name": "Devansh Gupta",
        "username": "devanshmusic",
        "city": "Jaipur",
        "state": "Rajasthan",
        "categories": ["Music"],
        "niches": ["Indie", "Fusion"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE, Platform.INSTAGRAM],
        "bio": "Indie-fusion musician blending Rajasthani folk with modern production.",
    },
    {
        "name": "Neha Kulkarni",
        "username": "nehasports",
        "city": "Nagpur",
        "state": "Maharashtra",
        "categories": ["Sports"],
        "niches": ["Cricket Analysis"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE, Platform.X],
        "bio": "Cricket analyst breaking down match tactics for a data-driven audience.",
    },
    {
        "name": "Farhan Ali",
        "username": "farhantechreviews",
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "categories": ["Technology"],
        "niches": ["Smartphones", "Budget Tech"],
        "type": CreatorType.CONTENT_CREATOR,
        "platforms": [Platform.YOUTUBE, Platform.INSTAGRAM],
        "bio": "Budget smartphone reviewer focused on value-for-money tech in tier-2 India.",
    },
    {
        "name": "Ritu Chawla",
        "username": "rituhome",
        "city": "Chandigarh",
        "state": "Punjab",
        "categories": ["Lifestyle"],
        "niches": ["Home Decor", "Minimalism"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.PINTEREST],
        "bio": "Minimalist home decor creator for small-space Indian apartments.",
    },
    {
        "name": "Arjun Menon",
        "username": "arjunfinance",
        "city": "Bengaluru",
        "state": "Karnataka",
        "categories": ["Finance"],
        "niches": ["Mutual Funds", "Tax Planning"],
        "type": CreatorType.CREATOR_FREELANCER,
        "platforms": [Platform.LINKEDIN, Platform.YOUTUBE],
        "bio": "SEBI-registered advisor simplifying mutual fund and tax planning basics.",
    },
    {
        "name": "Tanvi Joshi",
        "username": "tanvifitjourney",
        "city": "Indore",
        "state": "Madhya Pradesh",
        "categories": ["Fitness"],
        "niches": ["Yoga", "Nutrition"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Certified yoga instructor and nutrition coach for sustainable fitness habits.",
    },
    {
        "name": "Yusuf Merchant",
        "username": "yusufstartups",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "categories": ["Technology", "Finance"],
        "niches": ["Startups", "Venture Capital"],
        "type": CreatorType.CREATOR_FREELANCER,
        "platforms": [Platform.LINKEDIN, Platform.X],
        "bio": "Startup operator turned angel investor writing on India's venture ecosystem.",
    },
    {
        "name": "Simran Kaur",
        "username": "simranbeauty",
        "city": "Amritsar",
        "state": "Punjab",
        "categories": ["Beauty"],
        "niches": ["Makeup", "Skincare"],
        "type": CreatorType.INFLUENCER,
        "platforms": [Platform.INSTAGRAM, Platform.YOUTUBE],
        "bio": "Self-taught makeup artist creating accessible beauty tutorials for Indian skin tones.",
    },
]

BRANDS = [
    {"name": "Nimbus Wellness", "industry": "Health & Wellness", "city": "Mumbai"},
    {"name": "Kavaru Fintech", "industry": "Financial Services", "city": "Bengaluru"},
    {"name": "Sundrop Foods", "industry": "Food & Beverage", "city": "Delhi"},
    {"name": "TrekMate Travel", "industry": "Travel & Hospitality", "city": "Pune"},
    {"name": "Loomcraft Apparel", "industry": "Fashion & Apparel", "city": "Jaipur"},
]


def get_or_register(session: Session, *, email: str, username: str, full_name: str, role: str) -> User:
    from app.repositories import users as users_repo

    existing = users_repo.get_by_email(session, email)
    if existing:
        return existing
    result = auth_service.register_user(
        session,
        RegisterRequest(
            email=email, password=DEV_PASSWORD, full_name=full_name, username=username, role=role
        ),
    )
    return session.get(User, result.user.id)


def seed() -> None:
    engine = get_engine()
    with Session(engine) as session:
        print("Seeding demo users...")
        admin = get_or_register(
            session, email="admin@example.com", username="admin", full_name="Platform Admin", role="BRAND"
        )
        admin.role = UserRole.ADMIN
        session.add(admin)
        session.commit()

        get_or_register(
            session,
            email="creator@example.com",
            username="demo_creator",
            full_name="Demo Creator",
            role="CREATOR",
        )
        get_or_register(
            session, email="brand@example.com", username="demo_brand", full_name="Demo Brand Co", role="BRAND"
        )

        print(f"Seeding {len(CREATORS)} creators...")
        creator_profile_ids = []
        for spec in CREATORS:
            email = f"{spec['username']}@example.com"
            user = get_or_register(
                session, email=email, username=spec["username"], full_name=spec["name"], role="CREATOR"
            )
            profile = creators_repo.get_by_user_id(session, user.id)
            creator_service.update_profile(
                session,
                user,
                profile.id,
                CreatorProfileUpdate(
                    display_name=spec["name"],
                    bio=spec["bio"],
                    creator_type=spec["type"],
                    categories=spec["categories"],
                    niches=spec["niches"],
                    country="India",
                    state=spec["state"],
                    city=spec["city"],
                    languages=["English", "Hindi"],
                    availability=True,
                ),
            )
            for platform in spec["platforms"]:
                account = social_service.connect_account(
                    session, user, SocialAccountConnect(platform=platform, username=spec["username"])
                )
                social_service.sync_account(session, user, account.id)

            profile = creators_repo.get_by_id(session, profile.id)
            profile.verification_status = VerificationStatus.VERIFIED
            session.add(profile)
            session.commit()

            score_service.calculate_score(session, profile)

            pricing_service.create_pricing(
                session,
                user,
                profile.id,
                CreatorPricingCreate(
                    platform=spec["platforms"][0],
                    content_type=ContentType.REEL,
                    service_type="Sponsored post",
                    min_price=15000,
                    max_price=60000,
                    currency="INR",
                    pricing_model=PricingModel.RANGE,
                ),
            )
            portfolio_service.create_item(
                session,
                user,
                profile.id,
                PortfolioItemCreate(
                    title=f"{spec['categories'][0]} brand campaign",
                    brand_name="Past Client Co",
                    platform=spec["platforms"][0],
                    content_type=ContentType.REEL,
                    views=50_000,
                    engagement=4_000,
                ),
            )
            creator_profile_ids.append(profile.id)

        print(f"Seeding {len(BRANDS)} brands...")
        brand_ids = []
        for spec in BRANDS:
            slug_email = spec["name"].lower().replace(" ", "")
            email = f"contact@{slug_email}.example.com"
            username = slug_email[:20]
            user = get_or_register(
                session, email=email, username=username, full_name=spec["name"], role="BRAND"
            )
            user.is_verified = True
            session.add(user)
            session.commit()

            brand = brands_repo.get_by_user_id(session, user.id)
            brand_service.update_profile(
                session,
                user,
                brand.id,
                BrandProfileUpdate(
                    company_name=spec["name"], industry=spec["industry"], country="India", city=spec["city"]
                ),
            )
            brand_ids.append((user, brand.id))

        print("Seeding campaigns, shortlists, saved searches...")
        for i, (brand_user, brand_id) in enumerate(brand_ids):
            campaign = campaign_service.create_campaign(
                session,
                brand_user,
                brand_id,
                CampaignCreate(
                    name=f"{BRANDS[i]['name']} Creator Collab {i + 1}",
                    description="Multi-platform awareness campaign with verified creators.",
                    objective="Awareness",
                    budget=100000 + i * 25000,
                    currency="INR",
                ),
            )
            invited = creator_profile_ids[i], creator_profile_ids[(i + 1) % len(creator_profile_ids)]
            for creator_id in invited:
                campaign_service.invite_creator(
                    session,
                    brand_user,
                    campaign.id,
                    CampaignInviteRequest(creator_id=creator_id, agreed_price=30000),
                )
            campaign_service.add_deliverable(
                session,
                brand_user,
                campaign.id,
                CampaignDeliverableCreate(
                    creator_id=invited[0], title="Launch reel", content_type=ContentType.REEL
                ),
            )

            shortlist = shortlist_service.create_shortlist(
                session, brand_user, brand_id, ShortlistCreate(name=f"{BRANDS[i]['name']} shortlist")
            )
            shortlist_service.add_creator(
                session, brand_user, shortlist.id, creator_profile_ids[i], ShortlistItemCreate()
            )

            saved_search_service.create_saved_search(
                session,
                brand_user,
                brand_id,
                SavedSearchCreate(
                    name=f"{BRANDS[i]['industry']} creators under 50k",
                    filters_json={"category": BRANDS[i]["industry"], "max_price": 50000},
                ),
            )

        print("Seeding messages and notifications...")
        first_brand_user = brand_ids[0][0]
        first_creator_user = session.exec(
            select(User).where(User.username == CREATORS[0]["username"])
        ).first()
        conversation = messaging_service.create_conversation(
            session, first_brand_user, ConversationCreate(participant_user_ids=[first_creator_user.id])
        )
        messaging_service.send_message(
            session,
            first_brand_user,
            conversation.id,
            MessageCreate(
                content="Hi! We'd love to collaborate on our upcoming launch.", message_type=MessageType.TEXT
            ),
        )
        messaging_service.send_message(
            session,
            first_creator_user,
            conversation.id,
            MessageCreate(
                content="Thanks for reaching out - sending over my media kit shortly.",
                message_type=MessageType.TEXT,
            ),
        )

        notification_service.notify(
            session,
            user_id=first_creator_user.id,
            type_=NotificationType.OPPORTUNITY.value,
            title="New brand interest",
            body="A verified brand viewed your profile and saved a search matching you.",
        )

        print("Seed complete.")
        print(f"Demo login (any seeded account): password = {DEV_PASSWORD!r}")
        print("  admin@example.com (ADMIN), creator@example.com (CREATOR), brand@example.com (BRAND)")


if __name__ == "__main__":
    seed()
