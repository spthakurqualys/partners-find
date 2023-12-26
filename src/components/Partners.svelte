<script>
    import { onMount, onDestroy } from "svelte";
    import { isLoading, filterBy } from "../stores";

    let data = [];
    let partners = [];
    let localCount = 0;
    let worldwideCount = 0;

    onMount(async () => {
        try {
            isLoading.update((_) => true);
            const res = await fetch(`${window.location.href}/partners.json`, {
                method: "get",
            });
            if (res?.ok) {
                const resp = await res.json();
                data = [...resp];
                partners = [...data];
                isLoading.set(false);
            }
        } catch (e) {
            console.error(e);
        }
    });

    const filterPartners = (value) => {
        partners = data.filter((dat) => {
            let match = true;
            const regionId = dat.regions.map((region) => region.id);
            for (const [k, v] of Object.entries(value)) {
                if (k === "regionId" && v != "" && v != "all") {
                    match = match && regionId.includes(v) ? true : false;
                } else if (k === "countryId" && v != "" && v != "all") {
                    match = match && dat.countryId === v ? true : false;
                } else if (k === "types") {
                    match =
                        match && v.some((val) => dat[val] === true)
                            ? true
                            : false;
                }
            }
            return match;
        });
    };

    $: {
        worldwideCount = partners.filter(partner => partner.isWorldwide).length;
        localCount = partners.length - worldwideCount;
    }

    const unsubscribe = filterBy.subscribe((value) => {
        filterPartners(value);
    });

    onDestroy(unsubscribe);
</script>

<div class="q-grid__container">
    <div class="q-grid__inner">
        <div class="q-grid__row">
            <div class="q-grid__column q-grid__column-10 partners">
                <div class="partners-local">
                    <h2 class="heading--2">Local:</h2>
                    <p
                        class="no-partners-found {localCount == 0
                            ? ''
                            : 'hidden'} paragraph--1"
                    >
                        No local partners found in this region / country.
                    </p>
                    {#each partners as partner (partner.id)}
                        {#if !partner.isWorldwide}
                            <div class="partner">
                                <p class="paragraph--1 partner__name">
                                    <a href={partner.website}>{partner.name}</a>
                                </p>
                                <p>
                                    {#if partner.city !== null}{partner.city},{/if}
                                    {#if partner.state !== null}{partner.state}{/if}
                                    {#if partner.country !== null}{partner.country}<br
                                        />{/if}
                                    {#if partner.phone !== null}{partner.phone}{/if}
                                </p>
                                <div class="badge-container">
                                    {#if partner.isMsp}<div
                                            class="partner__badge partner__badge--msp"
                                        >
                                            MSSP
                                        </div>{/if}
                                    {#if partner.isVad}<div
                                            class="partner__badge partner__badge--vad"
                                        >
                                            VAD
                                        </div>{/if}
                                    {#if partner.isVar}<div
                                            class="partner__badge partner__badge--var"
                                        >
                                            VAR
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
                <div class="partners-worldwide">
                    <h2 class="heading--2">Worldwide:</h2>
                    <p
                        class="no-partners-found {worldwideCount == 0
                            ? ''
                            : 'hidden'} paragraph--1"
                    >
                        No worldwide partners found in this region / country.
                    </p>
                    {#each partners as partner (partner.id)}
                        {#if partner.isWorldwide}
                            <div class="partner">
                                <p class="paragraph--1 partner__name">
                                    <a href={partner.website}>{partner.name}</a>
                                </p>
                                <p>
                                    {#if partner.city !== null}{partner.city},{/if}
                                    {#if partner.state !== null}{partner.state}{/if}
                                    {#if partner.country !== null}{partner.country}{/if}<br
                                    />
                                    {#if partner.phone !== null}{partner.phone}{/if}
                                </p>
                                <div class="badge-container">
                                    {#if partner.isMsp}<div
                                            class="partner__badge partner__badge--msp"
                                        >
                                            MSSP
                                        </div>{/if}
                                    {#if partner.isVad}<div
                                            class="partner__badge partner__badge--vad"
                                        >
                                            VAD
                                        </div>{/if}
                                    {#if partner.isVar}<div
                                            class="partner__badge partner__badge--var"
                                        >
                                            VAR
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
                <br />
                <p class="note">
                    Partners may serve multiple territories. For regional
                    offices please visit the partner website or call the #
                    listed.
                </p>
            </div>
        </div>
    </div>
</div>
