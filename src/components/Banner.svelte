<script>
    import FilterBox from "./FilterBox.svelte";
    export let regionOptions, countryOptions, partnerTypes;

    let animateContent = [];
    let animate = false;
    const delays = [0, 300, 400, 400];

    setTimeout(() => {
        animateHeroContent();
    }, Math.max(...delays));

    const animateHeroContent = () => {
        animate = true;
        animateContent.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("animate");
            }, delays[index]);
        });
    };
</script>

<div class="q-default-hero q-default-hero--">
    <div class="q-default-hero__container">
        <div class="q-default-hero__content heroContent">
            <h1
                class="q-default-hero__heading q-hero-heading"
                bind:this={animateContent[0]}
            >
                Find a Cybersecurity partner.
            </h1>
            <h2
                class="q-default-hero__subheading"
                bind:this={animateContent[1]}
            >
                To find a Qualys partner in your region, please select from the
                list below.
            </h2>
        </div>

        <div class="q-default-hero__splash">
            <div
                class="q-default-hero__box-wrap heroBox"
                bind:this={animateContent[2]}
            >
                <FilterBox
                    selectOptions={regionOptions}
                    {countryOptions}
                    {partnerTypes}
                />
            </div>
            <div
                class="q-default-hero__image heroImage"
                bind:this={animateContent[3]}
            />
        </div>
    </div>
</div>
