//== TSX Components, Functions ==//
import { useEffect, useState } from 'react';
import { Container } from '../components/Container';

//-- NPM imports --//
import axios from 'axios';
import { square } from 'ldrs'; //-- Custom loader imported from ldrs (https://uiball.com/ldrs/) --//
square.register();

//== ***** ***** ***** Exported Component ***** ***** ***** ==//
export default function About() {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  //-- Fetch image of randomAnimal from S3 bucket --//
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'https://steph-paints-art-pics.s3.amazonaws.com/engagement_mav.jpeg',
          {
            responseType: 'blob',
          }
        );
        const imageBlob: Blob = await response.data;
        const imageURL: string = URL.createObjectURL(imageBlob);
        setImageSrc(imageURL);
        setImageLoaded(true);
      } catch (err) {}
    };
    fetchImage();
  }, []);

  //== ***** ***** ***** Component Return ***** ***** ***** ==//
  return (
    <>
      <div className='dark:bg-zinc-900'>
        <Container className=' dark:bg-zinc-900 py-8 flex flex-1'>
          <div className='grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-1 dark:bg-zinc-900'>
            <div className='lg:pl-20'>
              {imageLoaded ? (
                <>
                  <div className='max-w-xs px-2.5 lg:max-w-none'>
                    <img
                      src={imageSrc}
                      alt='Profile picture'
                      sizes='(min-width: 1024px) 32rem, 20rem'
                      className='aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800'
                    />
                  </div>
                </>
              ) : (
                //insert loader from form submission
                <div className='flex justify-center items-center'>
                  <l-square color='teal'></l-square>
                </div>
              )}
            </div>
            <div className='lg:order-first lg:row-span-2'>
              <h1 className='text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl'>
                I’m Stephanie Reagan.
              </h1>
              <div className='mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400'>
                <p>
                  I live in San Clemente, California with my husband, Kyle, and
                  our dog, Remi. If I'm not working, I'm probably painting or
                  surfing!
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                  officiis consequatur harum maiores earum. Unde similique fuga
                  minus mollitia dolorum inventore placeat voluptatibus suscipit
                  ex! Ullam non voluptatibus fugiat doloremque.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
                  et ut libero facilis fugit accusantium, harum, amet, deleniti
                  vel perspiciatis dolore quas labore officiis doloremque dicta
                  inventore sint repellendus saepe!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, quibusdam cumque perferendis iure unde perspiciatis
                  asperiores sequi quos quaerat, quis repellendus harum
                  cupiditate quae dicta neque aliquid! Laborum, libero
                  praesentium.
                </p>
              </div>
            </div>
            <div className='lg:pl-20'>
              {/* <ul role='list'>
            <SocialLink href='#' icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink>
            <SocialLink href='#' icon={InstagramIcon} className='mt-4'>
              Follow on Instagram
            </SocialLink>
            <SocialLink href='#' icon={GitHubIcon} className='mt-4'>
              Follow on GitHub
            </SocialLink>
            <SocialLink href='#' icon={LinkedInIcon} className='mt-4'>
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href='mailto:spencer@planetaria.tech'
              icon={MailIcon}
              className='mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40'
            >
              spencer@planetaria.tech
            </SocialLink>
          </ul> */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
