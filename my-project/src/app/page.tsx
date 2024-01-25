import Image from "next/image";
import Dogs from "../../public/emmy-lili-picture.png";
import Product from "../../public/product.png";
import { Arrow } from "../../components/icons/Arrow";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col bg-bg_secondary">
      <div className="bg-bg_primary">
        <div className="container">
          <h1>Привіт!</h1>
          <p>
            На нашому сайті ви знайдете безліч цікавого для здоров’я, гарного
            вигляду, подорожей та ігор. Все тільки для собак!
          </p>
        </div>
      </div>
      <section className="">
        <div className="container">
          <h2>Ми - Емі та Лілі, дружня команда, яка ніколи не нудьгує</h2>
          <p>
            Для нас дуже важливо бути здоровими й гарними, тому ми довго шукали
            найкращі засоби для волосся, аби воно було блискучим, гладеньким та
            чудово розчісувалося. Однак ми так і не змогли знайти універсальний
            засіб, який би задовольняв усі наші потреби. Ось такі ми вимогливі! 
          </p>
          <p>
            І тоді у нас виникла ідея - винайти свою супер формулу для
            здоров&apos;я волосся. Наші друзі трішки нам допомогли, але без нас
            вони б точно не впоралися! 
          </p>
          <p>
            Тож запрошуємо вас у світ краси! Спробуйте нашу формулу і
            обов&apos;язково скажіть, чи сподобалося вам. 
          </p>
          <Image src={Dogs} alt="Image of 2 dogs" />
        </div>
      </section>
      <section className="">
        <div className="container">
          <h2>Наші продукти</h2>
          <div className="grid grid-cols-3">
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <h2>Про нас</h2>
        </div>
      </section>
      <section className="" id="contacts">
        <div className="container">
          <h2>Контакти</h2>
        </div>
      </section>
    </div>
  );
}
